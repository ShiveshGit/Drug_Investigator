LOAD CSV WITH HEADERS FROM "DTO_cleaned5.csv" AS row
MERGE (subject:Entity {name: row.subject})
MERGE (object:Entity {name: row.object})
MERGE (subject)-[:`row.predicate`]->(object);