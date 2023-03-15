# API Design

Guideslines for API Design

The details of implementation depend on the API context: HTTP, GRPC, RPC, Local Function Calls, Procedures and CLI Commands.

But there are commonalities, and also they emanate from a functional design.

Functions:

- Functions are meant to be pure, this means no side-effects, or at least no observable side-effects
- Functions also are input output machines. They just transform input to output.
- If functions take a reference to an object/data structure, they do not mutate that object/data structure, they also return new data structures.
- Functions should not throw exceptions. They should succeed no matter the input, as long as the type system sufficiently constrains the input.
  - Therefore functions that get something should return a sentinel value representing emptiness, whether that is `null`, `undefined` or `0`, or `[]`.
- Functions should be composable, the output of a function should be used as the input to another function.

Procedures:

- Procedures are side-effectful.
- Procedures may take input and then return void. Returning void is fine as the expectation is that they have mutated something.
- Procedures may take references to objects/data structure and they mutate them. They should return void here.
- Procedures may throw exceptions.
- Procedures may require specific order when applied to a common data structure.
- Procedures can return a value if that value is needed for subsequent procedural operations (such as an ID after a creation procedure), and it is inefficient to expect the caller to fetch that value from a separate function. Bias towards returning void, and then only return the minimal values where needed.

Network Calls RPC:

- Some RPC calls are functions and should behave like so
- Some RPC calls are procedures and should behave like so
- RPC calls that get a singular resource based on an ID, should return either the value or a sentinel value representing emptiness.
- RPC calls that get a collection of resources based on an ID, should return a collection of values or the sentinel collection like `[]` or a stream that just ends.
- RPC calls that get a resource based on another resource based on the ID should also return a sentinel value.
- RPC calls that does something to a resource based on the ID should return an error if that ID doesn't exist. Because normally it would return void like procedures.

Network Request Response HTTP:

- This is known as message-passing API, different from RPC style API
- Replace singular resource emptiness with a 404 status code
- Collection resource emptiness is still `[]` but without a 404 status code

CLI Commands:

- Replace singular resource emptiness with a exit code greater than 0 and a STDERR message.
- Collection resource emptiness is still `[]` but without an exit code.
