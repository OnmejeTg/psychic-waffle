from .serializers import CustomerSerializer
from customers.models import Customers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET', 'POST'])
def customers(request):
    if request.method == 'GET':
        data = Customers.objects.all()
        serializer = CustomerSerializer(data, many=True)
        return Response({'customers':serializer.data})
    elif request.method == 'POST':
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'customer':serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'DELETE'])
def customer(request, id):
    try:
        data = Customers.objects.get(pk=id)
    except Customers.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = CustomerSerializer(data)
        return Response({'customer':serializer.data})
    elif request.method == 'DELETE':
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'POST':
        serializer = CustomerSerializer(data, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'customer':serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
