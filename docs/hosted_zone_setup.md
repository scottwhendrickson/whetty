# AWS Route 53 Hosted Zone Setup for Wix Domain

This guide details how to configure a domain registered with Wix to use AWS Route 53 for DNS management.

## Overview

When you register a domain with Wix but want to host your infrastructure on AWS, you need to:
1. Create a hosted zone in AWS Route 53 for your domain
2. Update the nameservers in Wix to point to AWS Route 53 nameservers

## Prerequisites

- Domain registered with Wix: `whetty.com`
- AWS account with appropriate permissions
- AWS CLI configured with credentials

## Current Wix Nameservers

The domain `whetty.com` is currently configured with the following Wix nameservers:

- `ns13.wixdns.net`
- `ns12.wixdns.net`

## Step 1: Create Hosted Zone in AWS Route 53

### Using AWS Console

1. Navigate to the [Route 53 Console](https://console.aws.amazon.com/route53/)
2. Click **Hosted zones** in the left navigation
3. Click **Create hosted zone**
4. Enter the following details:
   - **Domain name**: `whetty.com`
   - **Description**: (optional) "Hosted zone for whetty.com web application"
   - **Type**: Public hosted zone
   - **Tags**: (optional) Add tags for organization
5. Click **Create hosted zone**

### Using AWS CLI

```bash
# Set AWS credentials
export AWS_ACCESS_KEY_ID="YOUR_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="YOUR_SECRET_ACCESS_KEY"
export AWS_SESSION_TOKEN="YOUR_SESSION_TOKEN"  # Only for temporary credentials

# Create the hosted zone
aws route53 create-hosted-zone \
    --name whetty.com \
    --caller-reference $(date +%s) \
    --hosted-zone-config Comment="Hosted zone for whetty.com"
```

## Step 2: Get AWS Route 53 Nameservers

After creating the hosted zone, AWS will assign four nameservers. You need to retrieve these.

### Using AWS Console

1. In the Route 53 console, click on your newly created hosted zone
2. Note the four nameservers listed in the **Hosted zone details** section
3. They will look similar to:
   - `ns-1234.awsdns-12.org`
   - `ns-5678.awsdns-34.com`
   - `ns-9012.awsdns-56.net`
   - `ns-3456.awsdns-78.co.uk`

### Using AWS CLI

```bash
# Get the hosted zone ID (from the create command output or list)
HOSTED_ZONE_ID=$(aws route53 list-hosted-zones-by-name \
    --dns-name whetty.com \
    --query "HostedZones[0].Id" \
    --output text)

# Get the nameservers
aws route53 get-hosted-zone \
    --id $HOSTED_ZONE_ID \
    --query "DelegationSet.NameServers" \
    --output table
```

## Step 3: Update Nameservers in Wix

1. Log in to your [Wix account](https://www.wix.com/)
2. Navigate to **Domains** in your dashboard
3. Find `whetty.com` and click **Manage**
4. Look for **Nameservers** or **DNS Settings**
5. Select **Use custom nameservers** or **Change nameservers**
6. Replace the current Wix nameservers with the four AWS Route 53 nameservers
7. Save the changes

## Step 4: Verify DNS Propagation

DNS changes can take 24-48 hours to fully propagate, though they often happen much faster.

### Check nameserver propagation

```bash
# Check current nameservers
dig NS whetty.com +short

# Or using nslookup
nslookup -type=NS whetty.com
```

### Monitor propagation globally

Use online tools like:
- [WhatsMyDNS.net](https://www.whatsmydns.net/)
- [DNS Checker](https://dnschecker.org/)

## Step 5: Configure DNS Records in Route 53

Once the nameservers are updated, you can add DNS records in Route 53:

### Common records for AWS Amplify setup

1. **A Record** - Point to CloudFront distribution or Amplify app
2. **CNAME Record** - For www subdomain
3. **TXT Record** - For domain verification
4. **MX Records** - If using email services

Example CLI command to add an A record:

```bash
aws route53 change-resource-record-sets \
    --hosted-zone-id $HOSTED_ZONE_ID \
    --change-batch '{
        "Changes": [{
            "Action": "CREATE",
            "ResourceRecordSet": {
                "Name": "whetty.com",
                "Type": "A",
                "AliasTarget": {
                    "HostedZoneId": "Z2FDTNDATAQYW2",
                    "DNSName": "d1234567890.cloudfront.net",
                    "EvaluateTargetHealth": false
                }
            }
        }]
    }'
```

## Important Notes

- **TTL Values**: The current Wix nameservers have a 1 Day TTL, meaning changes may take up to 24 hours to propagate
- **Backup**: Document your current Wix DNS records before making changes
- **Email**: If you have email configured with Wix, ensure you migrate MX records to Route 53
- **Temporary Credentials**: The AWS credentials provided are session-based and will expire. For production use, configure permanent IAM user credentials or use AWS profiles

## Troubleshooting

### Nameservers not updating
- Wait 24-48 hours for full propagation
- Clear your local DNS cache: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder` (macOS)
- Check with your domain registrar (Wix) for any holds or locks

### Cannot create hosted zone
- Verify AWS credentials are valid and not expired
- Ensure IAM user/role has `route53:CreateHostedZone` permission
- Check if a hosted zone already exists for the domain

## Next Steps

After the hosted zone is configured and nameservers are propagated:

1. Set up AWS Amplify for hosting
2. Configure CloudFront distribution
3. Set up Lambda functions for backend logic
4. Configure Amazon Bedrock for AI capabilities
5. Add SSL/TLS certificate via AWS Certificate Manager

## References

- [AWS Route 53 Documentation](https://docs.aws.amazon.com/route53/)
- [Wix Domain Management](https://support.wix.com/en/article/connecting-a-domain-to-a-site-using-nameservers)
- [AWS Amplify Hosting](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)
