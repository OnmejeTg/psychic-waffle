from .serializers import CustomerSerializer, UserSerializer
from customers.models import Customers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import  RefreshToken

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
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

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        tokens = {
            'refresh':str(refresh),
            'access':str(refresh.access_token)
        }
        return Response(tokens, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
