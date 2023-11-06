/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  /**
   * route without middleware authentication
   */
  Route.get("/", async () => {
    return { hello: "world" };
  });

  Route.post("auth/login", "AuthController.create");
  Route.post("auth/register", "AuthController.store");

  // route group start:
  Route.group(() => {
    /**
     * post route
     */
    Route.get("posts", "PostsController.index");
    Route.post("posts/create", "PostsController.store");

    /**
     * roles data
     */
    Route.get("roles", "RolesController.index");
    Route.post("roles/create", "RolesController.store");
    Route.put("roles/update/:id", "RolesController.update");
    Route.delete("roles/delete/:id", "RolesController.destroy");

    /**
     * user data
     */
    Route.get("users", "UsersController.index");
    Route.post("users/create", "UsersController.store");
    Route.get("users/detail/:id", "UsersController.show");
    Route.put("users/update/:id", "UsersController.update");
    Route.delete("users/delete/:id", "UsersController.destroy");

    /**
     * periode route
     */
    Route.get("periods", "PeriodsController.index");
    Route.post("periods/create", "PeriodsController.store");
    Route.put("periods/update/:id", "PeriodsController.update");
    Route.delete("periods/delete/:id", "PeriodsController.destroy");

    /**
     * member route
     */
    Route.get("members", "MembersController.index");
    Route.post("members/create", "MembersController.store");
    Route.put("members/update/:id", "MembersController.update");
    Route.delete("members/delete/:id", "MembersController.destroy");

    /**
     * auth logout route
     */
    Route.post("auth/logout", "AuthController.destroy");
  }).middleware("auth:api");

  // route group end:
}).prefix("api");
