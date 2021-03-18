The problem is that we are attempting to use X.509 certificates where neither hostname nor IP address are reliable identifiers. We are attempting to use them in peer to peer scenario where we do not know what the hostname will be, and we do not know what the IP address will be. This might be fine for our direct grpc peer to peer connections, but it may be more difficult to achieve if we want to present an HTTPS API, in which HTTP clients will want to verify the common name or subject alternative names. We need to test if wildcard certificates work for this purpose.

The identification of the Node is through the public key.

The common name of the certificate should be arbitrary.

HTTPS does however require a common name to match the hostname/IP address.

PK HTTPS server isn't just on localhost.

Question is whether gRPC also requires the common name to be verified.

What happens if there's no common name, and no IP address specified?

MTLS is still possible, but there's no authentication as who is speaking.

Unless we have a custom verification where we only verify on the existence of the key.

---

We can stick the public key fingerprint (or public key) as the common name as well.

But we would need custom verification here when used in gRPC.

We could also use BIP39 and the other BIP standards to have a human readable name, these are non-FQDNs. These can also act as unique identifiers.

---

According to the standard: https://tools.ietf.org/html/rfc2818#section-3.1 and https://security.stackexchange.com/questions/61699/is-cn-hostname-verification-against-ssl-certificate-required-for-non-browser-sof

It is possible to "disable the name check". Which is what we want to do in the case of HTTP/HTTPS and grpc clients. Our name check is the public key check, there's no need to do further checks of this kind.

But if we are to allow arbitrary http clients, it may be necessary to not just use our self-signed certs, but to allow the user to use their own certs for this, such as they want a CA signed cert to represent the PK node. In that case, we should actually be generating a CSR. And by doing this we can integrate PK into existing CAs like letsencrypt and such.

However our CSR will have custom attributes that the CA will need to sign for. Specifically attributes that are important our own things.