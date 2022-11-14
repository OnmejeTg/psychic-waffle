from .serializers import CustomerSerializer
from customers.models import Customers
from django.http import JsonResponse

def customers(request):
    data = Customers.objects.all()
    serializer = CustomerSerializer(data, many=True)
    return JsonResponse({'customers':serializer.data})

def customer(request, id):
    data = Customers.objects.get(pk=id)
    serializer = CustomerSerializer(data)
    return JsonResponse({'customer':serializer.data})




