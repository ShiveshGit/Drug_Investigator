import {neo4j} from "@hypermode/modus-sdk-as";
import { Variables } from "@hypermode/modus-sdk-as/assembly/neo4j";

@json
class PossibleTails
{
    @alias("subject")
    subject!:string;
    @alias("predicate")
    predicate!:string;
    @alias("tail_label")
    tail_label!:string;
}

// @json
// class BestTail
// {
//     @alias("tail_label")
//     tail_label!:string;
// }

export function PossibleTailsFunc(tails:PossibleTails[]) : string{
    
    for(let i=0;i<tails.length;i++)
    {
        if(tails[i].tail_label.includes("[") || tails[i].tail_label.includes("]"))
        {
            continue;
        }
        console.log(tails[i].tail_label);   
        // const query=`WITH ["${tails[i].tail_label}"] AS objects, "${tails[i].predicate}" AS predicate_label MATCH (subject)-[r]->(object) WHERE object.name IN objects AND type(r) = predicate_label RETURN DISTINCT subject`;
        const query=`MATCH (subject)-[r]->(object:Node {name: "${tails[i].tail_label}"}) WHERE type(r) = "${tails[i].predicate}" RETURN DISTINCT subject`
    
        console.log("Query = "+query);
        const result = neo4j.executeQuery("neo4j",query);
        console.log("Result Length = "+result.Records.length.toString());
        if(result.Records.length>0)
        {
            // const query2 = `MERGE (subject:Node {name: "${tails[i].subject}"})
            //                 MERGE (object:Node {name: "${tails[i].tail_label}"})
            //                 MERGE (subject)-[:"${tails[i].predicate}"]->(object)`;

            const query2 = `
            MERGE (subject:Node {name: $subjectName})
            MERGE (object:Node {name: $objectName})
            MERGE (subject)-[:\`$predicate\`]->(object)
            `;
        
            // Parameters to pass into the query
            const parameters = new Variables();
            parameters.set("subjectName", tails[i].subject);
            parameters.set("objectName", tails[i].tail_label);
            parameters.set("predicate", tails[i].predicate);
        
           
            const result2 = neo4j.executeQuery("neo4j",query2,parameters);

            return tails[i].tail_label;
        }
    }
    return "None Found";
}