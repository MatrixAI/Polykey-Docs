Polykey takes concepts and patterns for multiple inspirations.

## MVC

Many software applications are structured in a layered-tiers. One of the most common is the Model View Controller architecture which has many variants.

```
                              ┌─────────────┐
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
                       └────────────────────► Model 3 ├─────────►  DB  │
                                            │         │         │      │
                                      ┌─────►         │         └──▲───┘
                                      │     └─────────┘            │
                                      │                            │
┌──────────────┐               ┌──────┴─────┐                      │
│              │               │            │                      │
│ Controller 2 ├───────────────►  Model 4   ├──────────────────────┘
│              │               │            │
└──────────────┘               └────────────┘
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