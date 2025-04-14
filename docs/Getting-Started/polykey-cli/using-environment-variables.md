# Using Environment Variables with Polykey

Polykey revolutionizes the management of environment variables by injecting them
securely into applications, surpassing traditional `.env` file methods. This
tutorial delves into the capabilities of the `polykey secrets env` command,
illustrating its versatility and offering detailed usage examples.

## Introduction

Environment variables are essential for configuring applications outside the
codebase, managing sensitive data such as API keys and database connections.
Traditional `.env` file approaches expose these to risks such as accidental
exposure and plaintext storage vulnerabilities. Polykey addresses these issues
by storing environment variables in encrypted vaults and injecting them
dynamically into applications, enhancing security and usability.

### Key Features of `polykey secrets env`

- **Encrypted Storage:** Secrets are safely stored within encrypted vaults.
- **Dynamic Injection:** Direct injection of secrets into applications minimizes
  exposure.
- **Decentralized Secure Sharing:** Supports encrypted secret sharing across
  collaborative environments.
- **Cross-Platform Compatibility:** Adapts to different operating systems with
  various output formats.

## Prerequisites

Before proceeding, ensure Polykey is installed on your system. Familiarize
yourself with creating vaults and managing secrets within Polykey.

## Tutorial Structure

This tutorial is structured to cover a range of scenarios illustrating the use
of the `polykey secrets env` command, ensuring you understand how to apply it
effectively across different contexts.

## Use Cases and Examples

### 1. Running Applications with Secure Environment Variables

Inject secrets directly into your applications at runtime, the most common and
critical use case for the polykey secrets env command.

#### Example: Start an application with a secure API key

```bash
polykey secrets env weather-ops:API_KEY -- node app.js
```

This will execute `app.js` with the `API_KEY` set, sourced from the
`Weather-Ops` vault.

### 2. Outputting Environment Variables

When you need to verify or debug environment variables without executing an
application, you can output them in different formats.

#### Unix-like Systems Example

```bash
olykey secrets env --env-format unix --env MyVault:API_KEY

API_KEY=someRandomValue123
```

#### JSON Format Example

```bash
polykey secrets env --env-format json --env MyVault:API_KEY

{
  "API_KEY": "someRandomValue123"
}
```

These commands display the environment variables in the console, useful for
validation.

### 3. Managing Variable Name Conflicts

Handle potential conflicts with invalid or duplicate environment variable names
efficiently.

#### Ignore Invalid Names Example

```bash
polykey secrets env --env-invalid ignore --env Weather-Ops:API_KEY -- node app.js
```

#### Overwrite Duplicates Example

```bash
polykey secrets env --env-duplicate overwrite --env Weather-Ops:API_KEY -- node app.js
```

These settings help manage potential variable name issues dynamically during
runtime.

### 4. Cloud Services Integration

Showcase integrating with cloud services like AWS using securely managed
secrets.

#### AWS CLI Integration Example

```bash
polykey secrets env \
  $ polykey secrets env aws-creds:AWS_ACCESS_KEY_ID aws-creds:AWS_SECRET_ACCESS_KEY -- aws s3 ls
```

This securely passes AWS credentials to the AWS CLI.

## Managing Secrets Across Environments

Discuss how to handle secrets in various environments such as development,
staging, and production, using different vaults or nodes.

### Dynamic Environment Handling Example

```bash
export PK_NODE_PATH='./prodNode'
polykey secrets env --env Production-Vault:SECRET_KEY -- node deploy.js
```

This facilitates secure management of different operational environments.

## Conclusion

The `polykey secrets env` command significantly enhances the security and
management of environment variables. It allows for the dynamic and secure
handling of sensitive data across different stages of development and
deployment.

:::note Additional References

We encourage you to delve deeper into Polykey and consider integrating it into
your workflows. For further insights and to participate in community
discussions, please explore the following resources:

- [Demo on replacing dotenv libraries with `polykey secrets env`:](https://polykey.com/blog/introducing-polykey-a-future-security-standard-for-replacing-dotenv-libraries)
  Discover how Polykey can replace traditional dotenv libraries to enhance your
  project's security.
- [Using Polykey for secure access to cloud providers:](https://polykey.com/blog/introducing-a-new-standard-in-environment-secrets-management-with-polykey)
  Learn how Polykey facilitates secure interactions with cloud services.

:::note

## Tying It All Together

**1. Initial Setup by User A:**

- User A sets up a project repository utilizing environment variables stored in
  a Polykey vault.

**2. Collaboration with User B:**

- User B, collaborating on the same project, requires access to the same
  environment variables to maintain consistency and functionality.

**3. Secure Sharing:**

- User A shares the vault with User B securely through Polykey. Once User B
  clones the vault, they can immediately use the custom script to inject the
  necessary environment variables into their session, replicating User A’s setup
  effortlessly.

**4. Customization of Environment Variables:**

- While some environment variables are shared, certain project-specific
  variables may need to be adjusted. Both users can modify their respective
  vaults or scripts as needed to accommodate these unique requirements.

## Experiment with Polykey

To see this process in action, consider following our detailed guide in the
dotenv library replacement demo. This demo provides hands-on experience with
simulating the secure environment variable sharing between two nodes controlled
by you, illustrating the practical benefits and ease of using Polykey in
collaborative environments.
