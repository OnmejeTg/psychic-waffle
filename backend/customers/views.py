from .serializers import CustomerSerializer
from customers.models import Customers
from django.http import JsonResponse

def customers(request):
    data = Customers.objects.all()
    serializer = CustomerSerializer(data, many=True)
    return JsonResponse({'customers':serializer.data})


