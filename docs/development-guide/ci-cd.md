# CI/CD

The CI/CD infrastructure for Polykey projects is all managed on GitLab.

## Setting up Gitlab CI/CD Mirror

Open source GitHub repositories are mirrored to
https://gitlab.com/MatrixAI/open-source in order to execute the CI/CD.

To setup a mirror:

1. Assume a GitHub repository exists.
2. Create a repository on GitLab under https://gitlab.com/MatrixAI/open-source.
   ![](/images/development-guide/run-cicd-for-external-repository.png)
3. Go to the repository settings and remove the default mirrored repository and
   add a new pull mirror:
   - Use the `https://` path to the GitHub repository.
   - If the repository is private on GitHub, you will need to use an access
     token that is part of `MatrixAI-Bot`. Do not use your personal access
     token. The username will be `MatrixAI-Bot`.
   - Enable `Overwrite diverged branches`.
   - Enable `Trigger pipelines for mirror updates`.
   - Mirror specific branches: `master|staging|feature.*` (this is a regular
     expression).
4. Under `Protected branches` and `Protected` tags:
   - Protect branches `master`, `staging`, `feature*`.
   - Protect tags `v*`, `prerelease*`, `release*`.
   - Only maintainers should be allowed to push and merge.
   - Only `feature*` is allowed to be force pushed.
     ![](/images/development-guide/gitlab-protected-branches.png)
5. Under the CI/CD variables, add in the relevant variables required to execute
   the `.gitlab-ci.yml`.
6. Under `Integrations`:
   - Enable `GitHub` as an integration.
   - Provide a commit status token.
   - Enter the relevant repository URL.
   - Enable `static status check names`.
7. Ensure the default branch matches the default branch on GitHub. Usually this
   is `staging` for both.

You should see CI/CD jobs execute under the `Pipelines`, and the status of these
appear in the GitHub status.

![](/images/development-guide/github-commit-status.png)

On GitHub add the pipeline status badges to show the status of the CI/CD on
GitLab. As an example, the below is the markdown excerpt for
https://github.com/MatrixAI/Polykey.

```
staging:[![pipeline status](https://gitlab.com/MatrixAI/open-source/Polykey/badges/staging/pipeline.svg)](https://gitlab.com/MatrixAI/open-source/Polykey/commits/staging)
master:[![pipeline status](https://gitlab.com/MatrixAI/open-source/Polykey/badges/master/pipeline.svg)](https://gitlab.com/MatrixAI/open-source/Polykey/commits/master)
```

staging:[![pipeline status](https://gitlab.com/MatrixAI/open-source/Polykey/badges/staging/pipeline.svg)](https://gitlab.com/MatrixAI/open-source/Polykey/commits/staging)
master:[![pipeline status](https://gitlab.com/MatrixAI/open-source/Polykey/badges/master/pipeline.svg)](https://gitlab.com/MatrixAI/open-source/Polykey/commits/master)

This allows us to communicate to others that the CI/CD runs on GitLab.

## Windows Runners

https://gitlab.com/gitlab-org/ci-cd/shared-runners/images/gcp/windows-containers/-/tree/main/cookbooks/preinstalled-software
