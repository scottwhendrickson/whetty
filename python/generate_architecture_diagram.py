#!/usr/bin/env python3
"""
Generate AWS Architecture Diagram for Whetty Website
Requires: pip install diagrams
"""

from diagrams import Diagram, Cluster, Edge, Node
from diagrams.aws.network import Route53, CloudFront
from diagrams.aws.database import Dynamodb
from diagrams.aws.integration import Appsync
from diagrams.aws.security import Cognito, CertificateManager
from diagrams.aws.devtools import Codebuild
from diagrams.aws.storage import S3
from diagrams.aws.management import Cloudformation
from diagrams.onprem.vcs import Github
from diagrams.onprem.client import Users
from diagrams.saas.cdn import Cloudflare  # Using as generic external service icon

graph_attr = {
    "fontsize": "16",
    "bgcolor": "white",
    "pad": "0.5",
    "splines": "ortho",
}

node_attr = {
    "fontsize": "12",
}

with Diagram("Whetty Website - AWS Architecture", 
             filename="docs/architecture", 
             show=False,
             direction="TB",
             graph_attr=graph_attr,
             node_attr=node_attr):
    
    users = Users("Visitors")
    github = Github("GitHub\nscottwhendrickson/whetty")
    
    # External services
    with Cluster("External Services"):
        shopify = Cloudflare("Shopify\nBuy Button")
        spotify = Cloudflare("Spotify\nEmbed")
        youtube = Cloudflare("YouTube\nEmbed")
    
    # DNS Layer
    with Cluster("DNS"):
        wix = Cloudflare("Wix\nwhetty.com\n(registrar)")
        route53 = Route53("Route 53\nHosted Zone")
        wix >> Edge(label="nameservers\n(pending flip)") >> route53
    
    # Hosting Layer
    with Cluster("AWS Amplify Hosting (us-east-1)"):
        with Cluster("CI/CD Pipeline"):
            codebuild = Codebuild("CodeBuild")
            s3_artifacts = S3("Build\nArtifacts")
            github >> Edge(label="git push") >> codebuild
            codebuild >> s3_artifacts
        
        # Using CloudFormation icon to represent Amplify (since Amplify uses CFN)
        amplify = Cloudformation("Amplify\nHosting")
        cloudfront = CloudFront("CloudFront\nCDN")
        acm = CertificateManager("ACM\nSSL")
        
        s3_artifacts >> amplify
        amplify >> cloudfront
        acm >> Edge(style="dotted") >> cloudfront
    
    # Backend Layer
    with Cluster("Amplify Gen 2 Backend"):
        cognito = Cognito("Cognito\nAuth")
        appsync = Appsync("AppSync\nGraphQL API")
        
        with Cluster("DynamoDB"):
            ddb_subscribers = Dynamodb("Subscriber\nTable")
            ddb_announcements = Dynamodb("Announcements\n(planned)")
        
        cognito >> Edge(style="dotted") >> appsync
        appsync >> ddb_subscribers
        appsync >> Edge(style="dotted") >> ddb_announcements
    
    # User flow
    users >> route53
    route53 >> cloudfront
    cloudfront >> amplify
    
    # Frontend to backend
    amplify >> Edge(label="GraphQL", color="blue") >> appsync
    
    # Frontend to external services
    amplify >> Edge(label="embed", style="dashed", color="gray") >> shopify
    amplify >> Edge(label="embed", style="dashed", color="gray") >> spotify
    amplify >> Edge(label="embed", style="dashed", color="gray") >> youtube

print("✅ Architecture diagram generated: docs/architecture.png")
