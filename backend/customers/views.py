from .serializers import CustomerSerializer
from customers.models import Customers
from django.http import JsonResponse, Http404

def customers(request):
    data = Customers.objects.all()
    serializer = CustomerSerializer(data, many=True)
    return JsonResponse({'customers':serializer.data})

def customer(request, id):
    try:
        data = Customers.objects.get(pk=id)
    except Customers.DoesNotExist:
        raise Http404
    serializer = CustomerSerializer(data)
    return JsonResponse({'customer':serializer.data})




