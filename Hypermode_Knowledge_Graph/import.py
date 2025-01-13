# from neo4j import GraphDatabase

# uri = "bolt://localhost:7687"
# driver = GraphDatabase.driver(uri, auth=("neo4j", "12345678"))

# def run_cypher_query(tx):
#     counter = 0
#     result = tx.run("""
#         LOAD CSV WITH HEADERS FROM 'file:///DTO_cleaned6.csv' AS row
#         RETURN row
#     """)
#     for record in result:
#         subject = record['row']['subject']
#         predicate = record['row']['predicate']
#         obj = record['row']['object']
        
#         # Merge entities and relationship
#         tx.run("""
#             MERGE (subject:Entity {name: $subject})
#             MERGE (object:Entity {name: $object})
#             MERGE (subject)-[:`{predicate}`]->(object);
#         """, subject=subject, predicate=predicate, object=obj)
        
#         counter += 1
#         if counter % 100 == 0:
#             print(f"{counter} entries processed...")
#             break

#     print(f"Finished processing {counter} entries.")

# with driver.session() as session:
#     session.write_transaction(run_cypher_query)

# driver.close()


from neo4j import GraphDatabase

uri = "bolt://localhost:7687"
driver = GraphDatabase.driver(uri, auth=("neo4j", "12345678"))

def run_cypher_query(tx):
    counter = 0
    result = tx.run("""
        LOAD CSV WITH HEADERS FROM 'file:///DTO_cleaned6.csv' AS row
        RETURN row
    """)
    for record in result:
        row = record['row']
        subject = row['subject']
        
        for predicate, obj in row.items():
            if predicate != 'subject' and obj:  # Skip 'subject' column and empty values
                # Merge entities and relationships
                tx.run(f"""
                    MERGE (subject:Entity {{name: $subject}})
                    MERGE (object:Entity {{name: $object}})
                    MERGE (subject)-[:`{predicate}`]->(object);
                """, subject=subject, object=obj)
        
        counter += 1
        if counter % 100 == 0:
            print(f"{counter} entries processed...")
            # break

    print(f"Finished processing {counter} entries.")

with driver.session() as session:
    session.write_transaction(run_cypher_query)

driver.close()
