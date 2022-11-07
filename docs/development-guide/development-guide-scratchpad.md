# Development Guide Scratchpad

Keeping a list of things to be integrated into programmer's reference documentation:

### Code:
* All class functions/variables that are only intended for internal class operations should be `protected` (not `private`)
   - Reasoning for this? Mostly because of subclassing?
* Correct logger usage and propagation (see rest of thread too): https://gitlab.com/MatrixAI/Engineering/Polykey/Polykey/-/merge_requests/213#note_717192817 - using `this.name` in static methods and `this.constructor.name` otherwise, whenever the class name is required https://github.com/MatrixAI/Polykey/issues/281#issuecomment-965989526
* Protobuf schema structure: https://github.com/MatrixAI/Polykey/issues/249#issuecomment-956265363 (likely to have some further changes - check later in the issue)

### Exceptions:
* Errors occurring from service handler logic should be in either `client/errors.ts` or `agent/errors.ts` (as opposed to the domain-level). For example, only GRPC-specific errors should be defined in `grpc/errors.ts`. https://gitlab.com/MatrixAI/Engineering/Polykey/Polykey/-/merge_requests/213#note_732415633
* Ensure that the `extends ...` higher-level exception class is prepended to the exception name. e.g. `class ErrorCLIGRPCNotStarted extends ErrorCLI {}`


### Module usage:
* No usage of sync functions from `fs`: https://gitlab.com/MatrixAI/Engineering/Polykey/Polykey/-/merge_requests/213#note_719283071:
* Importing:
   - utils and errors: `import * as domainUtils from '../domain';` or `import { utils as domainUtils, errors as domainErrors } from '../domain';`
   - don't do `import { errors } from '.';`

### Deployment:
* Some gist notes about using Docker and Nix https://github.com/MatrixAI/Polykey/issues/231#issuecomment-955960337

### Documentation:
* function comment blocks (in code):
   - no `@return`/`@param` usage in function comments (auto-generated, and return is inferred from the return type)

### Reviewing
* Ensure exceptions are defined where expected. From **Code** section: errors occurring from service handler logic should be in either `client/errors.ts` or `agent/errors.ts` (as opposed to the domain-level). For example, only GRPC-specific errors should be defined in `grpc/errors.ts`. https://gitlab.com/MatrixAI/Engineering/Polykey/Polykey/-/merge_requests/213#note_732415633

### Fast Check Usage

See for fast check usage, model checking, async model checking, concurrent model checking:

* https://github.com/MatrixAI/Polykey/issues/382
* https://github.com/MatrixAI/Polykey/issues/382#issuecomment-1280285365
* https://github.com/MatrixAI/Polykey/issues/382#issuecomment-1294353491
