#!/usr/bin/env sh

response=$(curl -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/certificate_packs" \
                -H "Content-Type: application/json" \
                -H "Authorization: Bearer $POLYKEY_DOCS_CLOUDFLARE_CLEANUP_TOKEN")

cert_ids=$(echo "$response" | jq -r --arg domain "$DOMAIN" '.result[] | select(.hosts[] | contains($domain)) | .id')

echo "$cert_ids" | while read -r cert_id; do
     curl -X DELETE --url "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/certificate_packs/$cert_id" \
          -H "Content-Type: application/json" \
          -H "Authorization: Bearer $POLYKEY_DOCS_CLOUDFLARE_CLEANUP_TOKEN"
done
