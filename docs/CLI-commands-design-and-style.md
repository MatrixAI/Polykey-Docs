* Toggles should be `-f` `-v` flags that when used are `true` and when not used are `false`. These can be joined up together like `-fv`, but this may be confusing with the multiword options, and in which case I usually don't use the joined up versions. Flags should be sparing, users should not need to remember every flag they need to do something.
* Options should ideally be optional `--key value` and `-k value`. In some cases they represent key-value parameters which are not optional. Make sure that multi-word options are like `--multi-word` and their short form is `-mw`.
* Parameters should be positional so `pk subcommand param1 param2`, in that case they are usually not optional and are required, it is possible to have arbitrary arity of parameters so you can have 1, or many.
* Exception is `pk subcommand -k value -k2 value -k3 value`, which is a key value parameters, this would not be optional, but in many cases if the commands are designed well, you should be able to have all values as parameters.

Make sure you're using the output formatting functions in the `src/bin/utils.ts` (or at least that's where I had them last). This ensures you have a consistent set outputs, whether it is a list, table, json or otherwise. We can have `-f` to indicate different output formats for these.

And for testing, try to use the `main` exported function, but I think as you said on slack there are new methods that make it easier to test these that might have been created by @DrFacepalm or @scottmmorris.

Finally make sure all your options/flags/parameters are consistent across all subcommands. In some cases we find better names we should switch to those.

Subcommands have better recall and discoverability:
* Subcommands have full words which is easier to understand, and easier to remember, less ambiguity
* Subcommands can be auto-suggested (because they have a deterministic position), flags cannot be
* High level commands should always be subcommands, not hidden behind flags
* Minimize optionality, increase conventionality, reduce user configuration headache, things should be as expected and intuitive as complexity allows