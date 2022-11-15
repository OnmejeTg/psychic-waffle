from .serializers import CustomerSerializer
from customers.models import Customers
from django.http import JsonResponse

@api_view(['GET', 'POST'])
def customers(request):
    data = Customers.objects.all()
    serializer = CustomerSerializer(data, many=True)
    return Response({'customers':serializer.data})

@api_view(['GET', 'POST', 'DELETE'])
def customer(request, id):
    data = Customers.objects.get(pk=id)
    serializer = CustomerSerializer(data)
    return JsonResponse({'customer':serializer.data})





