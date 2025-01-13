import pandas as pd

# Load the CSV file
data = pd.read_csv('DTO.csv')

# Define the columns that represent subjects, predicates, and objects
subject_column = 'Class ID'
predicate_column = 'Preferred Label'
object_column = 'Definitions'

# Extract relevant columns
data_extracted = data[[subject_column, predicate_column, object_column]]

# Drop rows where all three are NaN
data_extracted = data_extracted.dropna(how='all')

# Display the extracted data
print(data_extracted.head())