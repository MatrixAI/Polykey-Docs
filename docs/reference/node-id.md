# How Polykey Handles Node IDs

## The Basics

Polykey generates and encodes Node IDs using Multihash and Multibase to make them flexible, self-describing, and interoperable.

- **Multihash**: A format that encodes the hashing algorithm alongside the hash itself. This ensures that the Node ID always carries metadata about how it was generated.
- **Multibase**: A format that specifies how the hash is encoded, like Base32 Hex. The 'v' prefix is used to indicate Base32 Hex encoding in Polykey.

## How Node IDs Are Generated

### Step 1: Public Key to Multihash

- The Ed25519 Public Key is first hashed using a cryptographic hash function.
- This produces a Multihash output, which includes both the hash algorithm and the digest.

### Step 2: Multihash to Multibase

- The Multihash result is then encoded using Multibase.
- In Polykey, we use Base32 Hex encoding with a 'v' prefix to keep it easy to read and portable.

## Why Multihash and Multibase?

- **Future-Proofing**: Since Multihash includes the hash algorithm, we can change the algorithm later without breaking compatibility.
- **Interoperability**: Other cryptographic systems that use Multihash and Multibase can parse Polykey Node IDs without any issues.
- **Flexible Rendering**: A single Node ID can be represented differently if a different encoding or hash function is chosen.

## Default Representation in Polykey

Polykey defaults to rendering Node IDs as Base32 Hex, which has some major advantages:

- A 32-byte hash always results in a 52-character string.
- The alphabet is simple and does not use special characters, making it easy to copy, paste, and use anywhere.
- The lexicographic sort order of the raw 32-byte Node ID matches its encoded form. This keeps things consistent whether Node IDs are stored in memory or displayed in a human-readable format.

## How This Works in Practice

- Node IDs always go through Multihash first, then Multibase.
- Base32 Hex is the default format, but the same Node ID can be rendered in other ways.
- If a different base or hash is chosen, the Node ID will look different but still represent the same key.

## Key Takeaways

- Node IDs are hashed first (Multihash) and then encoded (Multibase).
- The default encoding is Base32 Hex, but other formats are possible.
- Base32 Hex ensures sort order consistency, easy readability, and portability.
- The Polykey codebase and the JS-ID repo have more details if needed.
