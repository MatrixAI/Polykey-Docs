Polykey takes concepts and patterns for multiple inspirations.

## MVC

Many software applications are structured in a layered-tiers. One of the most common is the Model View Controller architecture which has many variants.

```
                               Encapsulates model

Aggregates models together      ┌─────────────┐
                                │             │
  ┌──────────────┐              │ Model 1     │
  │              │              │ ┌─────────┐ │
  │ Controller 1 ├───────┬──────► │ Model 2 │ ├──────────────────────┐
  │              │       │      │ └─────────┘ │                      │
  └──────────────┘       │      │             │                      │
                         │      └───────┬─────┘                      │
                         │              │                            │
                         │              │     ┌─────────┐            │
                         │              └─────►         │         ┌──▼───┐
                         │                    │         │         │      │
                         └────────────────────► Model 3 ├─────────►  DB  │  Shared DB state
                                              │         │         │      │
 Manages mutual exclusion               ┌─────►         │         └──▲───┘
 and cross cutting concerns             │     └─────────┘            │
                                        │                            │
  ┌──────────────┐               ┌──────┴─────┐                      │
  │              │               │            │                      │
  │ Controller 2 ├───────────────►  Model 4   ├──────────────────────┘
  │              │               │            │
  └──────────────┘               └────────────┘

                    A ─► B means B is dependency injected into A

                       Models are generally composable
                       Controllers are generally not
```

In many web services, controllers are the entry-point to the application. These represent the external API of a web service.

Controllers handle all the boilerplate work of managing network requests such as:

* Authentication & Authorisation
* Caching
* Routing
* Transactions and Isolation
* Logging
* Validation
* Presentation & Formatting

Controllers will compose together models to perform business logic. Controllers will generally be "thin" compared to "fat" models. This is because the models do all the business logic. The business logic should be the bulk of the program, and may involve working with state, either in-memory or persisted state.

Stateful applications all end up using 1 or more databases (which may be in-memory or persisted). The more databases that are used, the more coordination or separation logic needs to be used in order to maintain consistency and availability.

You can see in the above diagram that controllers don't call each other. This is because controllers are not "composable". They can neither be functionally composed (i.e. 2 controllers cannot be composed into 1 controller), nor can they be object-composed (i.e. you cannot call a another controller from within an existing controller and no dependency injection of a controller into another controller).

One example of this non-composability is transaction contexts. Because transaction contexts often cannot be composed, this forces transaction contexts to be pushed up to the last outside layer where no-more composition is needed, and that's why controllers will create a transaction context that model operations will execute within.

These are not insurmountable (see Hierarchical Model View Controller), it is just because due to the amount of cross-cutting concerns and context that controllers deal with, they tend to not work together with other controllers. Instead controllers are just aggregated together to represent an API.

In PK's network API, instead of controllers we have GRPC handlers, and instead of models we have domains. Our handlers are thinner than controllers, and our domains are much fatter than models. For example, our domains handle transactions and authorisation, while our handlers often just proxy calls directly into the domains. Our domains also can have in-memory state, and can often coordinate with each other using locks. They are much richer objects.

Our domains are highly "programmable". We wanted PK to work like a library/package and not just as an end-user web service. Therefore our handlers only do the bare minimum work to map GRPC semantics to function/method APIs of our domain objects.

## 3 Layer Cake or Functional Core & Imperative Shell

* https://www.parsonsmatt.org/2018/03/22/three_layer_haskell_cake.html

## Import Dependency Order

All of our domains follow a common structure of:

* `types.ts`
* `errors.ts`
* `utils.ts`
* `Class.ts`
* `index.ts`

To avoid mutual dependencies, it's important to ensure that our imports follow this order.

```
     ┌──────────────────┐
     │                  │
     │                  │
Errors────►Types ──┐    │
  │         │      │    │
  │         │      │    │
  ▼         │      │    │
Utils ◄─────┘      │    │
  │                ▼    │
  └─────────► Classes ◄─┘
```

* types can import errors
* utils can import errors and types
* classes can import types, errors and utils

All files can import from standard library or NPM packages.

This applies within a domain, and across domains, so errors can import other domain's errors, and types can import other domain's types.

Avoid using index imports. Always import specifically. This avoids a deep import web when testing, and can allow us to partially change code without having to deal with all breakages across the import web before testing.