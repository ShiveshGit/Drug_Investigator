## Inspiration
Diseases have a way of emerging and disrupting lives whenever they get the opportunity. In 1919, the Spanish Flu caused a devastating pandemic, and a century later, in 2019, the world faced another global crisis as COVID-19 led to lockdowns, shuttered businesses, and widespread impact on daily life.<br>
Now, with the rise of HMPV (Human Metapneumovirus), we have developed a model that leverages existing knowledge bases, such as the Drug Target Ontology. This model identifies relationships between diseases by analyzing their semantic and structural connections, enabling it to uncover patterns and propagate insights effectively.

## What it does
Its a model that helps uncover patterns between diseases whether those be finding ancestors, medicines. So, the user inputs a node(subject) and an attribute of interest(predicate) and the model predicts possible nodes(objects).

## How we built it
![image](https://github.com/user-attachments/assets/8c050586-573d-479a-af12-f3116bee927a)


We first found our ontology of interest [DTO](https://bioportal.bioontology.org/ontologies/DTO). Then, we performed some preprocessing steps on it to remove empty columns, splitting about '|' since that implies having or values. Then, we loaded it onto Neo4j and checked its basic connection via Modus.<br>

We explored various methods to create embeddings for a knowledge base or ontology, experimenting with techniques such as DistMult, TransE, ComplEx, and ComplEx-GCN to generate knowledge graph embeddings. Among these, we found TransE to deliver the best results, so we decided to build our prediction model based on it.<br>
Initially, we attempted to host our application on Hugging Face but faced challenges integrating it with Modus. As a result, we opted to host the app locally. The app takes input through a separate web interface, which redirects control to Modus. This setup utilizes our pretrained model to generate relevant results.<br>
However, using these algorithms introduced a challenge of inconsistent mapping. To address this issue, we incorporated Neo4j for effective filtering, ensuring that only the most relevant and well-filtered nodes are added to the graph.
![image](https://github.com/user-attachments/assets/c44eb3d1-fc75-490a-9107-837474426f58)

## Challenges we ran into
Uploading data to neo4j from the csv found<br>
Setting up Modus <br>
Connecting AI model to Modus<br>
Modus Connection with Neo4j<br>
Handling cypher queries<br>
## Accomplishments that we're proud of
A knowledge base model that makes informed predictions and is free to use
## What we learned
A lot about GNNs<br>
How to handle embeddings for graphical data<br> 
## What's next for Drug Investigator
Making a RAG and GAN and connecting more external knowledge bases for better and informed predictions which need less verification as they are backed by science
