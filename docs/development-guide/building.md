# Building

### including non-code files in dist.

In some cases we need to include non typescript or javascript files in the dist directory. However the typscript compiler will not copy them over in some cases. So to make sure that they are included when polykey is built we need to add them to the npm postbuild hook.

```diff
-"postbuild": "cp -fR src/proto dist",
+"postbuild": "cp -fR src/proto dist; cp src/notifications/*.json dist/notifications/; cp src/claims/*.json dist/claims/",
```
