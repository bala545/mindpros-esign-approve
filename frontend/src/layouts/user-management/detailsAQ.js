export function getDetails() {
    const rowData = {
        "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjMwQzA4REI1NTA5MDk2NUU0RkYyMEY3RjRCNzRCNzU5QUY4NjIzRTEiLCJ4NXQiOiJNTUNOdFZDUWxsNVA4ZzlfUzNTM1dhLUdJLUUiLCJ0eXAiOiJKV1QifQ.eyJuYmYiOjE3MTgyOTk5NDgsImV4cCI6MTcxODMwMDg0OCwiaXNzIjoiaHR0cDovL3ZlcmEuc2VydmVyOjUwMDAiLCJhdWQiOlsiaHR0cDovL3ZlcmEuc2VydmVyOjUwMDAvcmVzb3VyY2VzIiwidmVyYV9hcGkiXSwiY2xpZW50X2lkIjoidmVyYV93ZWJfcG9ydGFsIiwic3ViIjoiZmY1MTU4NWYtNmFmOS00N2I0LWFiYTgtYjRjOGYzNWJlYTBlIiwiYXV0aF90aW1lIjoxNzE4Mjk5OTQ4LCJpZHAiOiJsb2NhbCIsImlkIjoiZmY1MTU4NWYtNmFmOS00N2I0LWFiYTgtYjRjOGYzNWJlYTBlIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdHRlYW1AbWluZC1wcm9zLmNvbSIsImVtYWlsIjoidGVzdHRlYW1AbWluZC1wcm9zLmNvbSIsIm5hbWUiOiJNaW5kUHJvcyBUZXN0Iiwic2NvcGUiOlsicmVhZCIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwd2QiXX0.neWoMHOy52JUljvbdaHuU-j-SdIXwhSFfIWyUQ5rCBV6hnnYHyo-IxGKqLENnTZrV21j9dYWbe9RA1oGpM5ssygIPI1YQNQq9ZUc48mQ4UevsceKEyvGG-j8FeCknJnxyaqnZBHX8faBrrq_Z8mnxSEa6c78S_a9k8iYbysv3XJHFEJTDqkYO4cpO3OlVHESgqZaC23Rn2zcoTlihFvsU0FTNE_7OJOGMhdQ9mwiVUuiyy5i-xBrPGv7VhCflbQV1ILzACTEaKlfzw6V_09qwujWV7FuJBaUP0WyW3oe5Hg3gz0fYbjPJ6CsAxU8ZLjxqyIg3XLLxjLzoiAIbb5diw",
        "assignedTask": {
            "_id": "0aee6e73-a633-450a-88dc-4c11799087ae",
            "group": "Argus System Owner",
            "role": "Argus System Owner",
            "meaning": "Argus System Owner Approval",
            "status": "Pending",
            "timestamp": "2021-07-16 01:58:51 +00:00",
            "signatureId": null,
            "rejectionId": null,
            "verificationStatus": null,
            "lastVerified": null
        },
        "authorExclusionEnabled": false,
        "currentUserId": "ff51585f-6af9-47b4-aba8-b4c8f35bea0e",
        "domainPageEnabled": true,
        "latestRevision": "1",
        "latestRouteId": "2c60f5be-95aa-4119-93cd-d1d63f7b9496",
        "latestRouteStatus": "In Progress",
        "record": {
            "locations": [
                {
                    "urls": {
                        "API": "https://macrogenics.qtestnet.com/api/v3/projects/115898/test-cases/46170972",
                        "Browser": "https://macrogenics.qtestnet.com/p/115898/portal/project#key=TC-1"
                    },
                    "location_id": "MacroGenics qTest Cloud Server",
                    "connection_id": "19fb837c-7b86-44d7-8d91-a1860ef49f72",
                    "item_type": "test-case",
                    "system": "qTest",
                    "local_id_fields": {
                        "Key": "TC-1",
                        "Item Type": "test-case",
                        "Entity ID": "46170972",
                        "Project ID": "115898",
                        "Project Name": "Validation Test Project"
                    }
                }
            ],
            "sub_records": [
                {
                    "locations": [
                        {
                            "urls": {
                                "API": "https://macrogenics.qtestnet.com/api/v3/projects/115898/test-steps/368890594",
                                "Browser": "https://macrogenics.qtestnet.com/p/115898/portal/project#key={Key}"
                            },
                            "location_id": "MacroGenics qTest Cloud Server",
                            "connection_id": "19fb837c-7b86-44d7-8d91-a1860ef49f72",
                            "item_type": "test-step",
                            "system": "qTest",
                            "local_id_fields": {
                                "Item Type": "test-step",
                                "Entity ID": "368890594",
                                "Project ID": "115898",
                                "Project Name": "Validation Test Project"
                            }
                        }
                    ],
                    "sub_records": [],
                    "linked_records": {},
                    "domain_id": null,
                    "_id": "368890594",
                    "name": "Step #1",
                    "record_type": "qTest Test Step",
                    "status": "Routing",
                    "domain": null,
                    "fields": [
                        {
                            "label": "Description",
                            "value": "<p>Step 1 for the GxP PQ Test for the GxP URS</p>"
                        },
                        {
                            "label": "Expected Result",
                            "value": "<p>Expected for step 1</p>"
                        }
                    ],
                    "original_location": {
                        "item_type": "test-step",
                        "system": "qTest"
                    },
                    "attachments": [
                        {
                            "_id": "60f0e7db544619bd9a722c49",
                            "name": "Approval Policy.json",
                            "file_size": "90637",
                            "content_hash": "8FDBCAA3F768971E9035E861231C5A36E14118A6D51F1CFE20B0AF7D219D6028",
                            "content_type": null,
                            "thisExtension": "json",
                            "FileType": "file",
                            "url": "/attachments/?recordId=0553b4af-aebb-45cf-9b34-2beaf9fc9ee3&versionId=928190ED10F0AE8284758259BDC0703471C07B57&subrecords=368890594&attachmentId=60f0e7db544619bd9a722c49"
                        }
                    ],
                    "version": null,
                    "revision": null
                }
            ],
            "linked_records": {},
            "domain_id": "69e04174-17ae-4a32-8925-78fee74e3bc3",
            "_id": "0553b4af-aebb-45cf-9b34-2beaf9fc9ee3",
            "name": "TC-1 - Test Case Covers VERA-4 GxP URS from Jira",
            "record_type": "qTest Test Case",
            "status": "Routing",
            "domain": "Validation Test",
            "fields": [
                {
                    "label": "Status",
                    "value": "New"
                },
                {
                    "label": "Type",
                    "value": "Manual"
                },
                {
                    "label": "GxP",
                    "value": "Y"
                },
                {
                    "label": "Category",
                    "value": "PQ"
                },
                {
                    "label": "qTest Version ID",
                    "value": "60773587"
                },
                {
                    "label": "Project ID",
                    "value": "115898"
                }
            ],
            "original_location": {
                "item_type": "test-case",
                "system": "qTest"
            },
            "attachments": [],
            "version": "928190ED10F0AE8284758259BDC0703471C07B57",
            "revision": "1"
        },
        "restUrl": "http://vera.server:5000",
        "route": {
            "_id": "2c60f5be-95aa-4119-93cd-d1d63f7b9496",
            "name": "Argus PQ GXP Test Approval",
            "routeTypeName": "Approval",
            "status": "In Progress",
            "recordId": "0553b4af-aebb-45cf-9b34-2beaf9fc9ee3",
            "ownerId": "jberek@tx3services.com",
            "creationDate": "2021-07-16 01:58:51 +00:00",
            "startDate": "2021-07-16 01:58:51 +00:00",
            "stopDate": "",
            "lastActivity": "2024-06-13T00:01:38.250Z",
            "record": {
                "locations": [
                    {
                        "urls": {
                            "API": "https://macrogenics.qtestnet.com/api/v3/projects/115898/test-cases/46170972",
                            "Browser": "https://macrogenics.qtestnet.com/p/115898/portal/project#key=TC-1"
                        },
                        "location_id": "MacroGenics qTest Cloud Server",
                        "connection_id": "19fb837c-7b86-44d7-8d91-a1860ef49f72",
                        "item_type": "test-case",
                        "system": "qTest",
                        "local_id_fields": {
                            "Key": "TC-1",
                            "Item Type": "test-case",
                            "Entity ID": "46170972",
                            "Project ID": "115898",
                            "Project Name": "Validation Test Project"
                        }
                    }
                ],
                "sub_records": [
                    {
                        "locations": [
                            {
                                "urls": {
                                    "API": "https://macrogenics.qtestnet.com/api/v3/projects/115898/test-steps/368890594",
                                    "Browser": "https://macrogenics.qtestnet.com/p/115898/portal/project#key={Key}"
                                },
                                "location_id": "MacroGenics qTest Cloud Server",
                                "connection_id": "19fb837c-7b86-44d7-8d91-a1860ef49f72",
                                "item_type": "test-step",
                                "system": "qTest",
                                "local_id_fields": {
                                    "Item Type": "test-step",
                                    "Entity ID": "368890594",
                                    "Project ID": "115898",
                                    "Project Name": "Validation Test Project"
                                }
                            }
                        ],
                        "sub_records": [],
                        "linked_records": {},
                        "domain_id": null,
                        "_id": "368890594",
                        "name": "Step #1",
                        "record_type": "qTest Test Step",
                        "status": "Routing",
                        "domain": null,
                        "fields": [
                            {
                                "label": "Description",
                                "value": "<p>Step 1 for the GxP PQ Test for the GxP URS</p>"
                            },
                            {
                                "label": "Expected Result",
                                "value": "<p>Expected for step 1</p>"
                            }
                        ],
                        "original_location": {
                            "item_type": "test-step",
                            "system": "qTest"
                        },
                        "attachments": [
                            {
                                "_id": "60f0e7db544619bd9a722c49",
                                "name": "Approval Policy.json",
                                "file_size": "90637",
                                "content_hash": "8FDBCAA3F768971E9035E861231C5A36E14118A6D51F1CFE20B0AF7D219D6028",
                                "content_type": null,
                                "thisExtension": "json",
                                "FileType": "file",
                                "url": "/attachments/?recordId=0553b4af-aebb-45cf-9b34-2beaf9fc9ee3&versionId=928190ED10F0AE8284758259BDC0703471C07B57&subrecords=368890594&attachmentId=60f0e7db544619bd9a722c49"
                            }
                        ],
                        "version": null,
                        "revision": null
                    }
                ],
                "linked_records": {},
                "domain_id": "69e04174-17ae-4a32-8925-78fee74e3bc3",
                "_id": "0553b4af-aebb-45cf-9b34-2beaf9fc9ee3",
                "name": "TC-1 - Test Case Covers VERA-4 GxP URS from Jira",
                "record_type": "qTest Test Case",
                "status": "Routing",
                "domain": "Validation Test",
                "fields": [
                    {
                        "label": "Status",
                        "value": "New"
                    },
                    {
                        "label": "Type",
                        "value": "Manual"
                    },
                    {
                        "label": "GxP",
                        "value": "Y"
                    },
                    {
                        "label": "Category",
                        "value": "PQ"
                    },
                    {
                        "label": "qTest Version ID",
                        "value": "60773587"
                    },
                    {
                        "label": "Project ID",
                        "value": "115898"
                    }
                ],
                "original_location": {
                    "item_type": "test-case",
                    "system": "qTest"
                },
                "attachments": [],
                "version": "928190ED10F0AE8284758259BDC0703471C07B57",
                "revision": "1"
            },
            "preventAuthorApproval": false,
            "signaturesRequired": true,
            "taskGroups": [
                {
                    "name": "Level 1",
                    "status": "In Progress",
                    "tasks": [
                        {
                            "_id": "0aee6e73-a633-450a-88dc-4c11799087ae",
                            "group": "Argus System Owner",
                            "role": "Argus System Owner",
                            "meaning": "Argus System Owner Approval",
                            "status": "Pending",
                            "timestamp": "2021-07-16 01:58:51 +00:00",
                            "signatureId": null,
                            "rejectionId": null,
                            "verificationStatus": null,
                            "lastVerified": null
                        },
                        {
                            "_id": "c858fd13-413e-48ed-8bb4-eb9728bc536c",
                            "assignee": "aparnadas@mind-pros.com",
                            "fullName": null,
                            "group": "IT Research and Development",
                            "role": "IT Research and Development",
                            "meaning": "IT Research and Development Approval",
                            "status": "Complete",
                            "timestamp": "2023-03-23 13:57:51 +00:00",
                            "signatureId": "76667c14-5efb-4f9b-b26a-db872893e3d2",
                            "rejectionId": null,
                            "verificationStatus": "Passed",
                            "lastVerified": "2024-05-31 00:01:26 +00:00",
                            "reviewerName": "Aparna Das (aparnadas@mind-pros.com)"
                        },
                        {
                            "_id": "2f99223d-7605-47ae-9ad0-12ad356051fa",
                            "group": "Clinical QA",
                            "role": "Clinical QA",
                            "meaning": "Clinical QA Approval",
                            "status": "Pending",
                            "timestamp": "2021-07-16 01:58:51 +00:00",
                            "signatureId": null,
                            "rejectionId": null,
                            "verificationStatus": null,
                            "lastVerified": null
                        },
                        {
                            "_id": "b68a8dac-68a1-42b3-a91d-da47c4182470",
                            "assignee": "dasap",
                            "fullName": "Aparna Das",
                            "group": "IT Quality and Compliance",
                            "role": "IT Quality and Compliance",
                            "meaning": "IT Quality and Compliance Approval",
                            "status": "Complete",
                            "timestamp": "2023-11-08 17:20:31 +00:00",
                            "signatureId": "50a8f1e4-432e-43c1-857d-77d3afeedb57",
                            "rejectionId": null,
                            "verificationStatus": "Passed",
                            "lastVerified": "2024-06-13 00:01:38 +00:00",
                            "reviewerName": "Aparna Das (dasap)"
                        }
                    ]
                }
            ],
            "locations": [
                {
                    "connection_id": "19fb837c-7b86-44d7-8d91-a1860ef49f72",
                    "location_id": "MacroGenics qTest Cloud Server",
                    "item_type": "test-case",
                    "local_id_fields": {
                        "Key": "TC-1",
                        "Item Type": "test-case",
                        "Entity ID": "46170972",
                        "Project ID": "115898",
                        "Project Name": "Validation Test Project"
                    }
                },
                {
                    "connection_id": "176116a7-224e-475b-87a5-649b11a70782",
                    "location_id": "MacroGenics VERA Server",
                    "item_type": "Record",
                    "local_id_fields": {}
                }
            ]
        },
        "routeView": false,
        "userIsInAuthorsList": false,
        "veraIdp": true
    };
    return rowData;
  }