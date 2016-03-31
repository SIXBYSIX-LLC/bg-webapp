angular.module('BG').factory('EquipmentsService',

  /** @ngInject */
    function (API,PaginationService,$http) {
    return {
      getEquipments: function (id, page, page_size) {
        return PaginationService.get("GET",
            API.baseURL + "products?user=" + id,
          null,
          true,
          page,
          page_size);
      },
      getAllEquipments: function (id) {
        return $http.get(API.baseURL + "products?user=" + id);
      },
      getCategories: function (parentId) {
        return $http.get(API.baseURL + "categories" + (parentId ? "?parent=" + parentId : "?parent__isnull=True"));
      },
      getAllCategories: function () {
        return $http.get(API.baseURL + "categories");
      },
      getEquipment: function (id) {
        return $http.get(API.baseURL + "products/" + id);
      },
      addEquipment: function (data) {
        return $http.post(API.baseURL + "products", data);
      },
      updateEquipment: function (id, data) {
        return $http.patch(API.baseURL + "products/" + id, data);
      },
      deleteEquipment: function (id) {
        return $http.delete(API.baseURL + "products/" + id).success(function(){

        }).error(function(data, status) {
          console.error('Repos error', status, data);
        });
      },
      deleteImage: function (id) {
        return $http.delete(API.baseURL + "staticfiles/" + id);
      },
      addToFavorite: function (userId, productId) {
        //https://api.marketplace.com/v1/users/user_id/favorite/products
        return $http.post(API.baseURL + "users/" + userId + "/favorite/products", {
          id: productId
        });
      },
      getFavoriteProductsCount: function (userId) {
        ///users/1/favorite/products
        return $http.get(API.baseURL + "users/" + userId + "/favorite/products?page_size=1").then(function (response) {
          return response.data.meta.count;
        });
      },
      getFavoriteProducts: function (userId) {
        ///users/1/favorite/products
        return $http.get(API.baseURL + "users/" + userId + "/favorite/products");
      }
    }
  }
);
