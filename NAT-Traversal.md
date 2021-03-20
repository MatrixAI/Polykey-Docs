TBD NAT Traversal

STUN references:

* https://tools.ietf.org/html/rfc8489
* https://tailscale.com/blog/how-nat-traversal-works/

TURN reference:

* https://tools.ietf.org/html/rfc8656

---

Current situation is:

1. We have tested TURN
2. We have not implemented ALL of TURN (this is because all of TURN is not necessary for us)
3. We have not tested STUN
4. We have not implemented ALL of STUN
5. The TURN relay/STUN MAY/(MOST LIKELY) is using uTP/MTP (which itself is running on UDP)

References:

* https://gitlab.com/MatrixAI/Engineering/Polykey/js-polykey/-/merge_requests/84

---

Example implementation of STUN and TURN:

* https://github.com/coturn/coturn
* https://www.rtcsec.com/post/2020/04/how-we-abused-slacks-turn-servers-to-gain-access-to-internal-services/