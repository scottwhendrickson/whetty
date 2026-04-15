# AWS Route 53 Hosted Zone Creation Log

**Date**: April 15, 2026  
**Domain**: whetty.com  
**Purpose**: DNS management for Amplify Gen 2 application

## Decision: Separate Hosted Zone from Amplify Deployment

The hosted zone was created as a **standalone resource** separate from the Amplify Gen 2 CDK deployment for the following reasons:

- **Lifecycle independence** - DNS infrastructure persists independently of application deployments
- **Avoid accidental deletion** - Critical DNS records are protected from stack teardowns
- **Cross-stack references** - Can be referenced by multiple applications/environments
- **Faster deployments** - Application deployments don't wait for DNS propagation
- **Domain verification** - Easier to manage domain setup before application exists

## Step 1: Set AWS Credentials

```bash
# Set AWS credentials (use your own credentials)
export AWS_ACCESS_KEY_ID="YOUR_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="YOUR_SECRET_ACCESS_KEY"
export AWS_SESSION_TOKEN="YOUR_SESSION_TOKEN"  # Only needed for temporary credentials
```

**Note**: Replace with your actual AWS credentials. For temporary session credentials, include the session token. For production operations, use IAM user credentials or AWS profiles configured with `aws configure`.

## Step 2: Create Hosted Zone

```bash
aws route53 create-hosted-zone \
    --name whetty.com \
    --caller-reference $(date +%s) \
    --hosted-zone-config Comment="Hosted zone for whetty.com Amplify Gen 2 application"
```

### Command Breakdown:
- `--name whetty.com` - The domain name for the hosted zone
- `--caller-reference $(date +%s)` - Unique identifier using Unix timestamp
- `--hosted-zone-config` - Configuration with descriptive comment

### Result:

```json
{
    "Location": "https://route53.amazonaws.com/2013-04-01/hostedzone/Z0074500Z0GR9W4SG049",
    "HostedZone": {
        "Id": "/hostedzone/Z0074500Z0GR9W4SG049",
        "Name": "whetty.com.",
        "CallerReference": "1776280587",
        "Config": {
            "Comment": "Hosted zone for whetty.com Amplify Gen 2 application",
            "PrivateZone": false
        },
        "ResourceRecordSetCount": 2
    },
    "ChangeInfo": {
        "Id": "/change/C09715182CG1BBF0RNEHA",
        "Status": "PENDING",
        "SubmittedAt": "2026-04-15T19:16:30.192000+00:00"
    },
    "DelegationSet": {
        "NameServers": [
            "ns-1538.awsdns-00.co.uk",
            "ns-1381.awsdns-44.org",
            "ns-322.awsdns-40.com",
            "ns-898.awsdns-48.net"
        ]
    }
}
```

## Step 3: Verify Hosted Zone

```bash
aws route53 get-hosted-zone --id Z0074500Z0GR9W4SG049
```

## Created Resources

### Hosted Zone Details

| Property | Value |
|----------|-------|
| **Hosted Zone ID** | `Z0074500Z0GR9W4SG049` |
| **Domain Name** | `whetty.com` |
| **Type** | Public Hosted Zone |
| **Status** | Active |
| **Record Sets** | 2 (NS and SOA records created automatically) |

### AWS Route 53 Nameservers

Replace the current Wix nameservers with these AWS nameservers:

1. `ns-1538.awsdns-00.co.uk`
2. `ns-1381.awsdns-44.org`
3. `ns-322.awsdns-40.com`
4. `ns-898.awsdns-48.net`

### Previous Wix Nameservers (for reference)

- `ns13.wixdns.net`
- `ns12.wixdns.net`

## Next Steps

### 1. Update Nameservers in Wix

1. Log in to [Wix Domains](https://www.wix.com/my-account/domains/)
2. Select `whetty.com`
3. Navigate to nameserver settings
4. Replace with the four AWS nameservers listed above
5. Save changes

### 2. Verify DNS Propagation

```bash
# Check nameservers
dig NS whetty.com +short

# Or using nslookup
nslookup -type=NS whetty.com
```

**Expected propagation time**: 24-48 hours (often faster)

### 3. Reference in Amplify Gen 2 CDK

When setting up your Amplify Gen 2 application, reference this hosted zone:

```typescript
import * as route53 from 'aws-cdk-lib/aws-route53';

// Import existing hosted zone
const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
  hostedZoneId: 'Z0074500Z0GR9W4SG049',
  zoneName: 'whetty.com',
});

// Use in Amplify custom domain configuration
// The hosted zone will be used to automatically create DNS records
```

## Useful Commands

### List all hosted zones
```bash
aws route53 list-hosted-zones
```

### List records in the hosted zone
```bash
aws route53 list-resource-record-sets --hosted-zone-id Z0074500Z0GR9W4SG049
```

### Get hosted zone details
```bash
aws route53 get-hosted-zone --id Z0074500Z0GR9W4SG049
```

### Check DNS propagation
```bash
# Check from multiple DNS servers
dig @8.8.8.8 whetty.com NS
dig @1.1.1.1 whetty.com NS
```

## Important Notes

- ✅ Hosted zone created successfully
- ⏳ Nameservers need to be updated in Wix
- ⏳ DNS propagation will take 24-48 hours after nameserver update
- 🔒 Hosted zone is separate from Amplify deployment (recommended approach)
- 💰 AWS Route 53 pricing: $0.50/month per hosted zone + $0.40 per million queries

## Troubleshooting

### If credentials expire
```bash
# Get new temporary credentials from AWS Console or SSO
# Then re-export the environment variables
```

### If hosted zone needs to be deleted
```bash
# First, delete all records except NS and SOA
# Then delete the hosted zone
aws route53 delete-hosted-zone --id Z0074500Z0GR9W4SG049
```

### Check hosted zone status
```bash
aws route53 get-change --id /change/C09715182CG1BBF0RNEHA
```

## References

- [AWS Route 53 Documentation](https://docs.aws.amazon.com/route53/)
- [Amplify Gen 2 Custom Domains](https://docs.amplify.aws/gen2/deploy-and-host/fullstack-branching/custom-domains/)
- [Wix Nameserver Configuration](https://support.wix.com/en/article/connecting-a-domain-to-a-site-using-nameservers)
