# Docker

## Image Publishing

Image publishing is done automatically through the CI/CD. However manual scripts are available below for deployment.

The below is an example of manual scripts that would be used if you were prototyping the publishing procedure.

### Deploying to AWS ECR:

#### Using skopeo

```sh
tag='manual'
registry_image='015248367786.dkr.ecr.ap-southeast-2.amazonaws.com/polykey'

# Authenticates skopeo
aws ecr get-login-password \
  | skopeo login \
  --username AWS \
  --password-stdin \
  "$registry_image"

build="$(nix-build ./release.nix --attr docker)"
# This will push both the default image tag and the latest tag
./scripts/deploy-image.sh "$build" "$tag" "$registry_image"
```

#### Using docker

```sh
tag='manual'
registry_image='015248367786.dkr.ecr.ap-southeast-2.amazonaws.com/polykey'

aws ecr get-login-password \
  | docker login \
  --username AWS \
  --password-stdin \
  "$registry_image"

build="$(nix-build ./release.nix --attr docker)"
loaded="$(docker load --input "$build")"
image_name="$(cut -d':' -f2 <<< "$loaded" | tr -d ' ')"
default_tag="$(cut -d':' -f3 <<< "$loaded")"

docker tag "${image_name}:${default_tag}" "${registry_image}:${default_tag}"
docker tag "${image_name}:${default_tag}" "${registry_image}:${tag}"
docker tag "${image_name}:${default_tag}" "${registry_image}:latest"

docker push "${registry_image}:${default_tag}"
docker push "${registry_image}:${tag}"
docker push "${registry_image}:latest"
```
