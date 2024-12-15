import random
import datetime
import mysql.connector

# Database connection configuration
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "industrial_plant"
}


# Function to generate random data for a single machine
def generate_machine_data(machine_id, location, timestamp):
    power_status = ["OK", "OVERLOAD", "FAULT"]
    voltage = round(220 + random.uniform(-10, 10), 2)
    current = round(5 + random.uniform(0, 20), 2)
    power_factor = round(random.uniform(0.85, 1.0), 2)
    power = round(voltage * current * power_factor, 2)
    energy_consumption = round(random.uniform(0.5, 5.0), 2)

    return {
        "machine_id": machine_id,
        "timestamp": timestamp,
        "location": location,
        "voltage": voltage,
        "current": current,
        "power": power,
        "energy_consumption": energy_consumption,
        "power_factor": power_factor,
        "status": random.choice(power_status),
        "high_power": random.random() > 0.8,
        "low_power_factor": random.random() > 0.5
    }


# Function to generate data for all machines in a plant
def generate_plant_data(plant_name, sections, start_date, end_date):
    data = []
    current_time = start_date
    while current_time < end_date:
        for section, count in sections.items():
            for i in range(1, count + 1):
                machine_id = f"{plant_name}_{section.upper()}_{str(i).zfill(3)}"
                location = f"{plant_name}/{section}"
                data.append(generate_machine_data(machine_id, location, current_time))
        current_time += datetime.timedelta(hours=1)
    return data


# Function to insert data into the database
def insert_data_to_db(cursor, data):
    for machine_data in data:
        # Insert into machines table (if not exists)
        cursor.execute("""
            INSERT INTO machines (machine_id, location) 
            VALUES (%s, %s)
            ON DUPLICATE KEY UPDATE location = VALUES(location)
        """, (machine_data["machine_id"], machine_data["location"]))

        # Insert into power_data table
        cursor.execute("""
            INSERT INTO power_data (machine_id, timestamp, voltage, current, power, energy_consumption, power_factor)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (
            machine_data["machine_id"],
            machine_data["timestamp"],
            machine_data["voltage"],
            machine_data["current"],
            machine_data["power"],
            machine_data["energy_consumption"],
            machine_data["power_factor"]
        ))

        # Insert into status table
        cursor.execute("""
            INSERT INTO status (machine_id, timestamp, status, high_power, low_power_factor)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            machine_data["machine_id"],
            machine_data["timestamp"],
            machine_data["status"],
            machine_data["high_power"],
            machine_data["low_power_factor"]
        ))


# Main function to populate data for a time range
def populate_data():
    # Plant configuration
    plants = {
        "Plant_A": {"moulage": 8, "froid": 8, "coupe": 8, "climatisation": 8, "lighting": 2, "ventilation": 2},
        "Plant_B": {"moulage": 8, "froid": 8, "coupe": 8, "climatisation": 8, "lighting": 2, "ventilation": 2}
    }

    # Define the time range (e.g., last year)
    end_date = (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(days=1)).replace(microsecond=0)
    start_date = (end_date - datetime.timedelta(days=365)).replace(microsecond=0)

    # Connect to the database
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()

    try:
        for plant_name, sections in plants.items():
            print(f"Generating data for {plant_name} from {start_date} to {end_date}...")
            all_data = generate_plant_data(plant_name, sections, start_date, end_date)
            print(f"Inserting {len(all_data)} records into the database...")
            insert_data_to_db(cursor, all_data)
            conn.commit()
            print(f"Data insertion for {plant_name} completed.")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cursor.close()
        conn.close()


if __name__ == "__main__":
    populate_data()
