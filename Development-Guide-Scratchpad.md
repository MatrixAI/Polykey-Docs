Keeping a list of things to be integrated into programmer's reference documentation:

### Code:
* All class functions/variables that are only intended for internal class operations should be `protected` (not `private`)
   - Reasoning for this? Mostly because of subclassing?
* Correct logger usage and propagation (see rest of thread too): https://gitlab.com/MatrixAI/Engineering/Polykey/js-polykey/-/merge_requests/213#note_717192817

### Module usage:
* No usage of sync functions from `fs`: https://gitlab.com/MatrixAI/Engineering/Polykey/js-polykey/-/merge_requests/213#note_719283071: 
* Importing:
   - utils and errors: `import * as domainUtils from '../domain';` or `import { utils as domainUtils, errors as domainErrors } from '../domain';`
   - don't do `import { errors } from '.';`

### Deployment:
* Some gist notes about using Docker and Nix https://github.com/MatrixAI/js-polykey/issues/231#issuecomment-955960337

### Documentation:
* function comment blocks (in code):
   - no `@return`/`@param` usage in function comments (auto-generated, and return is inferred from the return type)