from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import torch
from pykeen.triples import TriplesFactory
from pykeen.predict import predict_target
from django.http import JsonResponse
import pathlib
import json
def load_model(head,realation):
    model = None
    try:
        model = torch.load("model_start_app\\results\\trained_model.pkl", map_location=torch.device('cpu'))
    except Exception as e:
        pass
    triples_factory = TriplesFactory.from_path_binary("model_start_app\\results\\training_triples")
    print(triples_factory.num_entities)
    print(triples_factory.num_relations)
    pred = predict_target(
        model = model,
        relation=realation,
        head = head,
        triples_factory = triples_factory
    )
    print(pred.df.head(10))
    return JsonResponse(pred.df.head(100).to_dict(orient="records"), safe=False)  

@csrf_exempt
def home(request):
    if request.method=="POST":
        data = json.loads(request.body)
        return load_model(data.get("head"),data.get("relation"))
    return load_model("http://purl.obolibrary.org/obo/DOID_13099","Parents")