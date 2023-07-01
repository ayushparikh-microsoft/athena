import os
import mimetypes
import time
import logging
from azure.identity import DefaultAzureCredential
from azure.core.credentials import AzureKeyCredential
from azure.search.documents import SearchClient
from azure.storage.blob import BlobServiceClient
from azure.data.tables import TableServiceClient
from datetime import datetime

# Replace these with your own values, either in environment variables or directly here
AZURE_STORAGE_CONNECTION_STRING = os.environ.get("AZURE_STORAGE_CONNECTION_STRING")
table_service = TableServiceClient.from_connection_string(conn_str=AZURE_STORAGE_CONNECTION_STRING)

table_client = table_service.get_table_client(table_name="Feedback")
entities = table_client.query_entities(query_filter="")
for entity in entities:
    for key in entity.keys():
        print("Key: {}, Value: {}".format(key, entity[key]))