from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from order_management.models import *
from order_management.serializers import *
from product_management.serializers import ProductSerializer


class UserOrderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(customer=request.user)
        serializer = OrderHistorySerializer(orders, many=True)
        return Response({"orders": serializer.data})


class CartOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart_orders = Order.objects.filter(
            customer=request.user, status=Order.STATUS_CART
        )
        serializer = OrderSerializer(cart_orders, many=True)
        return Response({"cart_orders": serializer.data})


class ProductsInUserOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id, customer=request.user)
        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found or not belongs to the user"}, status=404
            )

        product_orders = ProductOrder.objects.filter(order=order)
        products = [po.product for po in product_orders]

        serializer = ProductSerializer(products, many=True)
        return Response({"products": serializer.data})


class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        product_id = request.data.get("product_id")
        quantity = int(request.data.get("quantity", 1))

        product = get_object_or_404(Product, pk=product_id)

        order, created = Order.objects.get_or_create(
            customer=request.user,
            status=Order.STATUS_CART,
            defaults={"shipping": None, "total_price": 0},
        )

        prod_order, po_created = ProductOrder.objects.get_or_create(
            order=order, product=product, defaults={"quantity": quantity}
        )
        if not po_created:
            prod_order.quantity += quantity
            prod_order.save()

        serializer = ProductOrderSerializer(prod_order)
        return Response(
            {"message": "Added to cart", "data": serializer.data},
            status=201,
        )


class RemoveFromCartView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=404)

        order = Order.objects.filter(
            customer=request.user, status=Order.STATUS_CART
        ).first()
        if not order:
            return Response({"error": "Cart not found"}, status=404)

        product_order = ProductOrder.objects.filter(
            order=order, product=product
        ).first()
        if not product_order:
            return Response({"error": "Product not in cart"}, status=404)

        product_order.delete()

        return Response({"message": "Product removed from cart"}, status=200)


class ConfirmOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        order = Order.objects.filter(
            customer=request.user, status=Order.STATUS_CART
        ).first()

        if not order:
            return Response({"error": "Order not found or not in cart"}, status=404)

        order.status = Order.STATUS_PENDING
        order.save()
        product_orders = ProductOrder.objects.filter(order=order)
        for product_order in product_orders:
            product = product_order.product
            if product.stock >= product_order.quantity:
                product.stock -= product_order.quantity
                product.save()
            else:
                return Response(
                    {"error": f"Not enough stock for {product.name}"}, status=400
                )

        return Response({"message": "Order confirmed and stock updated"}, status=200)


class ShippingListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        shipping_methods = Shipping.objects.all()
        serializer = ShippingSerializer(shipping_methods, many=True)
        return Response({"data": serializer.data})


class PaymentByOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        payment = get_object_or_404(Payment, order_id=order_id)
        serializer = PaymentSerializer(payment)
        return Response({"data": serializer.data})
