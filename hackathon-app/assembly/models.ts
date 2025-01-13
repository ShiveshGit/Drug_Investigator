import {http} from "@hypermode/modus-sdk-as";
import { JSON } from "json-as";

@json
class ModelRequest
{
    @alias("head")
    head!:string;
    @alias("relation")
    relation!:string;
}
// @json
// class response
// {
//     tail_id!:string;
//     score!:string;
//     tail_label!:string;
// }
@json
class ModelResponse
{   
    @alias("tail_id")   
    tail_id!:number;
    @alias("score")
    score!:number;
    @alias("tail_label")    
    tail_label!:string;
    
}
export function ModelRequestFunc(head:string,relation:string) : ModelResponse[] {

    const url="http://127.0.0.1:8000/model_start/"
    const request = new http.Request(url, {
    method: "POST",
    headers: http.Headers.from([
        ["Content-Type", "application/json"],
    ]),
    body: http.Content.from(<ModelRequest>{ head, relation }),
  } as http.RequestOptions);
    
  const response = http.fetch(request);
  if(!response.ok)
  {
    throw new Error("Failed to fetch the data");
  }
  return response.json<ModelResponse[]>();
}