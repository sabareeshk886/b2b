-- Auto-generated SQL for Fernway B2B North

-- --------------------------------------------------------
-- Trip: FWN 100 - AGRA - DELHI - 3N/4D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('d9ea21d3-a52f-4e5f-9074-0cb4d0e09037', 'FWN100', 'FWN 100 - AGRA - DELHI - 3N/4D', 'NORTH', 4, 3, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('6b20f539-462b-4a28-a572-e2c9990f63dc', 'd9ea21d3-a52f-4e5f-9074-0cb4d0e09037', 20, 8300, 'INR');
INSERT INTO trip_items (id, trip_id, type, item) VALUES ('c55b1b40-0c75-4452-a388-de3cf540670e', 'd9ea21d3-a52f-4e5f-9074-0cb4d0e09037', 'inclusion', '2 BREAKFAST
3 LUNCH
3 DINNER
3 NIGHT STAY (QUADRUPLE SHARING)
AC VEHICLE
ALL SIGHTSEEING AS PER YOUR ITINERARY
MAJOR ENTRY TICKETS');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('c71cde07-9136-4de0-ace0-d14a1891f190', 'd9ea21d3-a52f-4e5f-9074-0cb4d0e09037', 25, 7700, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('79f687a9-3260-4e93-a885-35e185478490', 'd9ea21d3-a52f-4e5f-9074-0cb4d0e09037', 30, 7100, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('26a68218-74c2-4c2f-825c-e70fa1e2524d', 'd9ea21d3-a52f-4e5f-9074-0cb4d0e09037', 35, 6800, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('be418a75-9f38-4a6b-9f09-de660e13fc1d', 'd9ea21d3-a52f-4e5f-9074-0cb4d0e09037', 40, 6600, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('477ad110-af17-442a-9d71-70975284a1f7', 'd9ea21d3-a52f-4e5f-9074-0cb4d0e09037', 45, 6400, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('4070603a-c108-40f7-b738-8ea62e073b76', 'd9ea21d3-a52f-4e5f-9074-0cb4d0e09037', 50, 6250, 'INR');
-- --------------------------------------------------------
-- Trip: FWN 101 - AGRA - DELHI  - 4N/5D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('f765e4d3-6c00-445b-bc50-1d0068c9084b', 'FWN101', 'FWN 101 - AGRA - DELHI  - 4N/5D', 'NORTH', 5, 4, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('089ce9cd-c2a2-4c96-9b84-eefff61f8f93', 'f765e4d3-6c00-445b-bc50-1d0068c9084b', 20, 10050, 'INR');
INSERT INTO trip_items (id, trip_id, type, item) VALUES ('5e5cf03e-af4f-47de-95a9-01414e2393d0', 'f765e4d3-6c00-445b-bc50-1d0068c9084b', 'inclusion', '3 BREAKFAST
4 LUNCH
4 DINNER
3 NIGHT STAY (QUADRUPLE SHARING)
AC VEHICLE
ALL SIGHTSEEING AS PER YOUR ITINERARY
MAJOR ENTRY TICKETS');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('98becc2f-48dc-45f9-ae3a-eac0aa323b52', 'f765e4d3-6c00-445b-bc50-1d0068c9084b', 25, 9400, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('aee15b7c-982e-4bd0-ace4-4b52881fb1d2', 'f765e4d3-6c00-445b-bc50-1d0068c9084b', 30, 8450, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('27c2ae45-6548-4646-9776-404898086f88', 'f765e4d3-6c00-445b-bc50-1d0068c9084b', 35, 8150, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('12ab169e-61dc-4cbe-92b3-37eb18f0c717', 'f765e4d3-6c00-445b-bc50-1d0068c9084b', 40, 7900, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('7ccb55b8-bcd8-426e-9a56-c4eb2496164b', 'f765e4d3-6c00-445b-bc50-1d0068c9084b', 45, 7700, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('5d535115-9518-45c2-8a21-986fc99142a2', 'f765e4d3-6c00-445b-bc50-1d0068c9084b', 50, 7500, 'INR');
-- --------------------------------------------------------
-- Trip: FWN102-  AGRA - FATEPUR - JAIPUR - DELHI - 5N / 6D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('72ce66a2-a450-409c-9b0d-1f7c1bc6f143', 'FWN102', 'FWN102-  AGRA - FATEPUR - JAIPUR - DELHI - 5N / 6D', 'NORTH', 6, 5, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('d73e50fd-3d8b-4ecd-afce-3fb01737fc8a', '72ce66a2-a450-409c-9b0d-1f7c1bc6f143', 20, 7, 'INR');
INSERT INTO trip_items (id, trip_id, type, item) VALUES ('57d543ca-2609-4aa3-aa94-2e2a11d6dd8b', '72ce66a2-a450-409c-9b0d-1f7c1bc6f143', 'inclusion', '4 BREAKFAST
5 LUNCH
5 DINNER
4 NIGHT STAY (QUADRUPLE SHARING)
AC VEHICLE
ALL SIGHTSEEING AS PER YOUR ITINERARY
MAJOR ENTRY TICKETS');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('4b20d4ea-5801-444a-9fab-e38cc7813dd8', '72ce66a2-a450-409c-9b0d-1f7c1bc6f143', 25, 8, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('1da2e370-431e-4960-80dd-9b23979fe92b', '72ce66a2-a450-409c-9b0d-1f7c1bc6f143', 30, 9, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('a20a344f-c30f-4c3a-bc6f-a46632d46868', '72ce66a2-a450-409c-9b0d-1f7c1bc6f143', 35, 10, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('8c1caab8-e2d6-4b86-9d4b-39c30134518c', '72ce66a2-a450-409c-9b0d-1f7c1bc6f143', 40, 12, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('6fa4de6a-f854-414a-b642-b5d182818cc5', '72ce66a2-a450-409c-9b0d-1f7c1bc6f143', 45, 13, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('641efb29-f39e-402c-aac3-3001c150b300', '72ce66a2-a450-409c-9b0d-1f7c1bc6f143', 50, 14, 'INR');
-- --------------------------------------------------------
-- Trip: FWN103 -  AGRA - JAIPUR - DELHI - 4N / 5D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('0789800b-3d81-462f-b7e7-d7c0aec5dc55', 'FWN103', 'FWN103 -  AGRA - JAIPUR - DELHI - 4N / 5D', 'NORTH', 5, 4, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('9ce19eeb-4a82-4264-8165-d298ac7c9e71', '0789800b-3d81-462f-b7e7-d7c0aec5dc55', 20, 10700, 'INR');
INSERT INTO trip_items (id, trip_id, type, item) VALUES ('ee3c2cc1-e49b-4480-b2e8-d328eff8dc63', '0789800b-3d81-462f-b7e7-d7c0aec5dc55', 'inclusion', '3 BREAKFAST
4 LUNCH
4 DINNER
3 NIGHT STAY (QUADRUPLE SHARING)
AC VEHICLE
ALL SIGHTSEEING AS PER YOUR ITINERARY
MAJOR ENTRY TICKETS');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('921d6495-0904-480c-bc7a-d1401cb222ff', '0789800b-3d81-462f-b7e7-d7c0aec5dc55', 25, 9800, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('e73f77b6-3a46-497b-8438-b2e6a2d8cb5a', '0789800b-3d81-462f-b7e7-d7c0aec5dc55', 30, 9000, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('e4aba015-8e3d-4cca-b01b-6a44e4566a90', '0789800b-3d81-462f-b7e7-d7c0aec5dc55', 35, 8500, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('aadfe4b4-6153-4b5f-ad08-b49cf596c213', '0789800b-3d81-462f-b7e7-d7c0aec5dc55', 40, 8100, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('0af12ba3-20b6-4ac4-8d83-2ddcbb80c6f2', '0789800b-3d81-462f-b7e7-d7c0aec5dc55', 45, 7800, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('64473db7-4b5d-407a-ae6a-434321c5ed51', '0789800b-3d81-462f-b7e7-d7c0aec5dc55', 50, 7600, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('dd006f10-2b10-4747-a717-02b97aab192b', '0789800b-3d81-462f-b7e7-d7c0aec5dc55', 55, 7300, 'INR');
-- --------------------------------------------------------
-- Trip: FWN104 -  AGRA - JAIPUR - DELHI - 5N / 6D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('7752915a-3ff7-45d1-b718-dc7083e8c71d', 'FWN104', 'FWN104 -  AGRA - JAIPUR - DELHI - 5N / 6D', 'NORTH', 6, 5, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('a4a6a240-97db-4d97-ad51-0a765c86c2cb', '7752915a-3ff7-45d1-b718-dc7083e8c71d', 20, 13400, 'INR');
INSERT INTO trip_items (id, trip_id, type, item) VALUES ('bf514d26-c4f4-4853-bc6d-d2bcfc8e056c', '7752915a-3ff7-45d1-b718-dc7083e8c71d', 'inclusion', '4 BREAKFAST
5 LUNCH
5 DINNER
3 NIGHT STAY (QUADRUPLE SHARING)
AC VEHICLE
ALL SIGHTSEEING AS PER YOUR ITINERARY
MAJOR ENTRY TICKETS');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('1fce9b32-d794-42fb-8d24-ce7337cb1796', '7752915a-3ff7-45d1-b718-dc7083e8c71d', 25, 11700, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('73244f4c-c4f9-4026-9b75-bc283862d781', '7752915a-3ff7-45d1-b718-dc7083e8c71d', 30, 10800, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('51e9e020-2d76-4e39-831f-3cf9d4316984', '7752915a-3ff7-45d1-b718-dc7083e8c71d', 35, 10100, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('84fd3487-a528-443d-9c8f-8ce05f4e77d5', '7752915a-3ff7-45d1-b718-dc7083e8c71d', 40, 9650, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('d09ba486-aa41-4c5a-bf34-3437ff62744d', '7752915a-3ff7-45d1-b718-dc7083e8c71d', 45, 9300, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('19bdbf41-1c53-4aa0-9eb7-e7f18d84b5d1', '7752915a-3ff7-45d1-b718-dc7083e8c71d', 50, 9050, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('e0ec9eae-c7f4-4f79-92d0-0e8d51f4ac24', '7752915a-3ff7-45d1-b718-dc7083e8c71d', 55, 8700, 'INR');
-- --------------------------------------------------------
-- Trip: FWN105 - DELHI - MANAL - 3N 4D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('5460e7ed-40a6-4b18-aada-0633cf952e9c', 'FWN105', 'FWN105 - DELHI - MANAL - 3N 4D', 'NORTH', 0, 0, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('7c896fda-223c-497e-8d7a-f8c8ceb1e80a', '5460e7ed-40a6-4b18-aada-0633cf952e9c', 20, 7, 'INR');
INSERT INTO trip_items (id, trip_id, type, item) VALUES ('b38fd005-69b9-47c3-a097-4fd2fee8f994', '5460e7ed-40a6-4b18-aada-0633cf952e9c', 'inclusion', '2 BREAKFAST
2 LUNCH
2 DINNER
1 NIGHT STAY (QUADRUPLE SHARING)
2 NIGHT JOURNEY
AC VEHICLE
ALL SIGHTSEEING AS PER YOUR ITINERARY
MAJOR ENTRY TICKETS');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('ca2b7400-46b0-420d-acd6-a0d8ece2cc36', '5460e7ed-40a6-4b18-aada-0633cf952e9c', 25, 8, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('222bf2a0-5dd5-48ef-ba23-163a29b0dc12', '5460e7ed-40a6-4b18-aada-0633cf952e9c', 30, 9, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('1c452ad3-d2f8-4220-a275-161d60dc32bb', '5460e7ed-40a6-4b18-aada-0633cf952e9c', 35, 10, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('2981b3b5-8639-4789-8bd7-b6a5e7a73cc5', '5460e7ed-40a6-4b18-aada-0633cf952e9c', 40, 12, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('2d62ce5e-39d2-460c-8cb7-4ce62b9f2ecb', '5460e7ed-40a6-4b18-aada-0633cf952e9c', 45, 13, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('b6d372bb-8425-4865-a0ef-409155cc452d', '5460e7ed-40a6-4b18-aada-0633cf952e9c', 50, 14, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('2f865082-174b-44c0-907d-261f19417a26', '5460e7ed-40a6-4b18-aada-0633cf952e9c', 55, 15, 'INR');
-- --------------------------------------------------------
-- Trip: FWN106 - DELHI - MANALI  4N / 5D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('111ee171-e623-4e9c-9362-85a58376f0f4', 'FWN106', 'FWN106 - DELHI - MANALI  4N / 5D', 'NORTH', 5, 4, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('8432f523-7e5b-44ac-90a1-7b06789c1a93', '111ee171-e623-4e9c-9362-85a58376f0f4', 20, 10700, 'INR');
INSERT INTO trip_items (id, trip_id, type, item) VALUES ('f0c02685-d23f-42a6-b0cb-f70ba556940a', '111ee171-e623-4e9c-9362-85a58376f0f4', 'inclusion', '3 BREAKFAST
4 LUNCH
3 DINNER
 NIGHT STAY (QUADRUPLE SHARING)
AC VEHICLE
2 NIGHT JOURNEY
ALL SIGHTSEEING AS PER YOUR ITINERARY
MAJOR ENTRY TICKETS');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('5ab85d51-16a4-4b59-872c-b5753b807030', '111ee171-e623-4e9c-9362-85a58376f0f4', 25, 9700, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('25a1a11f-2886-47c6-ac7d-1ab141baa9cd', '111ee171-e623-4e9c-9362-85a58376f0f4', 30, 9250, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('03e92a50-2a73-4c11-96db-59fa8be047a1', '111ee171-e623-4e9c-9362-85a58376f0f4', 35, 8650, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('5197e2dd-c2a4-42bc-a324-7b064bb53181', '111ee171-e623-4e9c-9362-85a58376f0f4', 40, 8150, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('23bbe007-760a-45b6-a1da-a7bde6a85492', '111ee171-e623-4e9c-9362-85a58376f0f4', 45, 7800, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('b16fde58-8c0b-4d38-8e78-0bd25567830f', '111ee171-e623-4e9c-9362-85a58376f0f4', 50, 7550, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('c4b91e45-8252-4ab2-aa04-bafbb9898f34', '111ee171-e623-4e9c-9362-85a58376f0f4', 55, 7300, 'INR');
-- --------------------------------------------------------
-- Trip: FWN107  -  AGRA - DELHI - MANALI  5N / 6D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('2a837187-277f-487c-9daf-c9b5346e2492', 'FWN107', 'FWN107  -  AGRA - DELHI - MANALI  5N / 6D', 'NORTH', 6, 5, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('1c309dc2-fec0-49bf-8215-22bde7e2b81e', '2a837187-277f-487c-9daf-c9b5346e2492', 20, 11800, 'INR');
INSERT INTO trip_items (id, trip_id, type, item) VALUES ('b4e45a13-f3b9-4ad6-9dda-b954c560459e', '2a837187-277f-487c-9daf-c9b5346e2492', 'inclusion', '4 BREAKFAST
5 LUNCH
5 DINNER
3 NIGHT STAY (QUADRUPLE SHARING)
AC VEHICLE
ALL SIGHTSEEING AS PER YOUR ITINERARY
MAJOR ENTRY TICKETS');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('93cc0c55-951c-484e-a56f-dd42d73ab86b', '2a837187-277f-487c-9daf-c9b5346e2492', 25, 10500, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('a8985c7e-bf12-42f0-b529-19e5eb0f4825', '2a837187-277f-487c-9daf-c9b5346e2492', 30, 10300, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('5b1cdb6e-e948-464d-9f6e-cc6cc9699edc', '2a837187-277f-487c-9daf-c9b5346e2492', 35, 9700, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('95a111b4-6e79-4094-ad72-44c80ed2f52f', '2a837187-277f-487c-9daf-c9b5346e2492', 40, 9250, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('4a6418b7-d25a-46be-8e61-528502a821d1', '2a837187-277f-487c-9daf-c9b5346e2492', 45, 8750, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('304d87b4-9d91-4588-9efc-837a616df412', '2a837187-277f-487c-9daf-c9b5346e2492', 50, 8600, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('9c9c20a9-2003-4996-95c8-6459e164b6cc', '2a837187-277f-487c-9daf-c9b5346e2492', 55, 8400, 'INR');
-- --------------------------------------------------------
-- Trip: FWN108 -  AGRA - DELHI - MANALI (3) - 6N / 7D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('bc4c873e-c66d-431c-8bcb-c03d504cf042', 'FWN108', 'FWN108 -  AGRA - DELHI - MANALI (3) - 6N / 7D', 'NORTH', 7, 6, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('e43d16a4-e872-4f7c-ab38-8e9192fe380c', 'bc4c873e-c66d-431c-8bcb-c03d504cf042', 20, 13300, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('0e94ae2e-2463-43a2-9da2-3a00feefeb8e', 'bc4c873e-c66d-431c-8bcb-c03d504cf042', 25, 12900, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('0775a443-6400-40ba-96b1-0ecbe8b7b558', 'bc4c873e-c66d-431c-8bcb-c03d504cf042', 30, 11700, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('7b0fd5d5-7ad6-4431-a31f-0acaadd0c68b', 'bc4c873e-c66d-431c-8bcb-c03d504cf042', 35, 11050, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('6164a0f6-c1ef-402d-8f29-50cf04f1cb5e', 'bc4c873e-c66d-431c-8bcb-c03d504cf042', 40, 10550, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('374299ae-9a60-4484-a974-9093afe8799b', 'bc4c873e-c66d-431c-8bcb-c03d504cf042', 45, 10050, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('7ced0a9c-ca4d-4ce7-ba2c-a813c5c0dcb9', 'bc4c873e-c66d-431c-8bcb-c03d504cf042', 50, 9850, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('60f0a9ea-ea1d-4546-8213-454e6708032e', 'bc4c873e-c66d-431c-8bcb-c03d504cf042', 55, 9600, 'INR');
-- --------------------------------------------------------
-- Trip: FWN109 -  AGRA - DELHI(3) - MANALI - 6N / 7D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('02cc8bf5-d5c9-418b-b81b-dc4a446989e1', 'FWN109', 'FWN109 -  AGRA - DELHI(3) - MANALI - 6N / 7D', 'NORTH', 7, 6, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('73a4ca47-fa0a-4cfb-8027-e828e7938958', '02cc8bf5-d5c9-418b-b81b-dc4a446989e1', 20, 13300, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('809e692e-005d-4529-ba2b-55de12b5e91b', '02cc8bf5-d5c9-418b-b81b-dc4a446989e1', 25, 12900, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('19a41f4c-99b2-4b0c-a3df-d09f8d41e1eb', '02cc8bf5-d5c9-418b-b81b-dc4a446989e1', 30, 11700, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('99c5a219-4e50-4f18-83f5-5d40634ba983', '02cc8bf5-d5c9-418b-b81b-dc4a446989e1', 35, 11050, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('6bea8705-c02b-4c9a-9bbc-9e6f28751834', '02cc8bf5-d5c9-418b-b81b-dc4a446989e1', 40, 10550, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('066e9b0a-35d5-47a4-8de1-d5885e78bb55', '02cc8bf5-d5c9-418b-b81b-dc4a446989e1', 45, 10050, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('68ba776f-5f14-4f89-b235-225f39ad937b', '02cc8bf5-d5c9-418b-b81b-dc4a446989e1', 50, 9850, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('0fb0bc37-3cfa-45f7-9b9c-4599dc14b3d5', '02cc8bf5-d5c9-418b-b81b-dc4a446989e1', 55, 9600, 'INR');
-- --------------------------------------------------------
-- Trip: FWN110  -  DELHI - MANALI - KASOL  5N / 6D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('3f2b6d17-f1e6-434b-9ec2-180829277313', 'FWN110', 'FWN110  -  DELHI - MANALI - KASOL  5N / 6D', 'NORTH', 6, 5, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('725b2bb8-b166-4097-ae2f-993749535ec0', '3f2b6d17-f1e6-434b-9ec2-180829277313', 20, 11800, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('e51242dd-0bf6-4a56-b64e-cefd5bf3151a', '3f2b6d17-f1e6-434b-9ec2-180829277313', 25, 10500, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('dcc3e5a6-e0d8-43d6-9c82-6cbbaaeb3879', '3f2b6d17-f1e6-434b-9ec2-180829277313', 30, 10300, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('8ed77193-d3bb-430a-9f45-7a0637bb0bf9', '3f2b6d17-f1e6-434b-9ec2-180829277313', 35, 9700, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('76bcc6d3-80d4-497c-90f4-feaaa9d4e006', '3f2b6d17-f1e6-434b-9ec2-180829277313', 40, 9250, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('a8dcde7c-0a1b-4fcf-bb8e-ce27903162dd', '3f2b6d17-f1e6-434b-9ec2-180829277313', 45, 8750, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('5839bd4b-df37-4cbf-9c3d-6c09aed906e2', '3f2b6d17-f1e6-434b-9ec2-180829277313', 50, 8600, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('3c05a390-767a-41f8-9ffa-52cefd539434', '3f2b6d17-f1e6-434b-9ec2-180829277313', 55, 8400, 'INR');
-- --------------------------------------------------------
-- Trip: FWN111  -  DELHI(3) - MANALI - KASOL  6N / 7D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('7ca7d279-a918-4cf3-aa82-2456a37e8c09', 'FWN111', 'FWN111  -  DELHI(3) - MANALI - KASOL  6N / 7D', 'NORTH', 7, 6, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('896e7b59-f15a-4e6e-9d95-965dc3fb4d62', '7ca7d279-a918-4cf3-aa82-2456a37e8c09', 20, 13300, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('e59effbb-9d7b-4e08-ae95-c045360e63e3', '7ca7d279-a918-4cf3-aa82-2456a37e8c09', 25, 12900, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('5be3c74d-335b-4970-86c2-9a02b607602d', '7ca7d279-a918-4cf3-aa82-2456a37e8c09', 30, 11700, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('5baf2c23-848f-4056-9f30-0b7293da6e83', '7ca7d279-a918-4cf3-aa82-2456a37e8c09', 35, 11050, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('37f8f4ef-f323-46d0-ace5-b956379dbdc4', '7ca7d279-a918-4cf3-aa82-2456a37e8c09', 40, 10550, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('b5e7bf80-8640-42b8-b5bb-d33a3655cca9', '7ca7d279-a918-4cf3-aa82-2456a37e8c09', 45, 10050, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('79976d65-b4f1-4d1e-88cc-22e9bbd07d6f', '7ca7d279-a918-4cf3-aa82-2456a37e8c09', 50, 9850, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('f4c22f81-6e9b-46ea-9abd-5f7af86d8f85', '7ca7d279-a918-4cf3-aa82-2456a37e8c09', 55, 9600, 'INR');
-- --------------------------------------------------------
-- Trip: FWN113 -  AGRA - DELHI - MANALI - AMRTSAR  6N / 7D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('58a8deb1-e27a-467b-b1af-adaa3e93175c', 'FWN113', 'FWN113 -  AGRA - DELHI - MANALI - AMRTSAR  6N / 7D', 'NORTH', 7, 6, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('22b9396e-60bf-40d1-aea4-e26062be42fe', '58a8deb1-e27a-467b-b1af-adaa3e93175c', 20, 13500, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('8184cdac-a616-440e-a2d9-82acf9feb0d5', '58a8deb1-e27a-467b-b1af-adaa3e93175c', 25, 12200, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('13d969c1-c57b-4543-acdb-82d7031b70af', '58a8deb1-e27a-467b-b1af-adaa3e93175c', 30, 11900, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('6f540027-7fdf-4a2d-9362-8e775071c408', '58a8deb1-e27a-467b-b1af-adaa3e93175c', 35, 11300, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('ff4ed01a-dc00-4160-9a9e-42baf4b51dc2', '58a8deb1-e27a-467b-b1af-adaa3e93175c', 40, 10750, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('98401b48-5450-453f-9940-8e532e1f0e9f', '58a8deb1-e27a-467b-b1af-adaa3e93175c', 45, 10250, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('6e77ce7f-5fc0-470a-8919-24b09891f06a', '58a8deb1-e27a-467b-b1af-adaa3e93175c', 50, 10100, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('460961a6-f632-4e19-ba5f-bb32fd7d8ddd', '58a8deb1-e27a-467b-b1af-adaa3e93175c', 55, 9800, 'INR');
-- --------------------------------------------------------
-- Trip: FWN114  -  AGRA - DELHI - MANALI - KASOL 6N / 7D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('6447e156-c944-4fa1-ba91-027cfe3b10b8', 'FWN114', 'FWN114  -  AGRA - DELHI - MANALI - KASOL 6N / 7D', 'NORTH', 7, 6, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('bacd5b69-ea41-4cb7-a359-1d8d3d6f56f9', '6447e156-c944-4fa1-ba91-027cfe3b10b8', 20, 13400, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('02a3ecd8-c451-4f91-a50f-186c57d13d8b', '6447e156-c944-4fa1-ba91-027cfe3b10b8', 25, 12100, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('93fa9385-428a-4f60-92f6-1bfd123dadf3', '6447e156-c944-4fa1-ba91-027cfe3b10b8', 30, 11800, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('2ef5eba8-7f42-445a-8d9f-9e70a3ea7e17', '6447e156-c944-4fa1-ba91-027cfe3b10b8', 35, 11100, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('c805b08d-ab50-4a37-88d5-e85003750955', '6447e156-c944-4fa1-ba91-027cfe3b10b8', 40, 10550, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('fdd33b30-ca6a-44ef-bb81-2213f57de1b1', '6447e156-c944-4fa1-ba91-027cfe3b10b8', 45, 10050, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('a070fa07-bb37-48cc-90dc-2e0d74b2d2f4', '6447e156-c944-4fa1-ba91-027cfe3b10b8', 50, 9900, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('8009df86-2e0c-41dc-bed7-eb0ff9eec8e5', '6447e156-c944-4fa1-ba91-027cfe3b10b8', 55, 9600, 'INR');
-- --------------------------------------------------------
-- Trip: FWN115 -  AGRA - DELHI - MANALI(3) - AMRITSAR 7N / 8D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('88b9f4fc-42b3-4f9e-a4f9-5e9ae62767e9', 'FWN115', 'FWN115 -  AGRA - DELHI - MANALI(3) - AMRITSAR 7N / 8D', 'NORTH', 8, 7, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('a7af23ab-1474-441a-9184-89c646f90677', '88b9f4fc-42b3-4f9e-a4f9-5e9ae62767e9', 20, 14800, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('c1641b84-9ec3-4fde-b4f3-171a3864a3e8', '88b9f4fc-42b3-4f9e-a4f9-5e9ae62767e9', 25, 13500, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('cc0b9861-1f50-4209-a185-185e95c5d366', '88b9f4fc-42b3-4f9e-a4f9-5e9ae62767e9', 30, 13150, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('cc4210bb-7875-4999-85eb-a7f6cb8f34eb', '88b9f4fc-42b3-4f9e-a4f9-5e9ae62767e9', 35, 12550, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('304c1538-0c03-4bf2-bf6a-821f8cd2ae80', '88b9f4fc-42b3-4f9e-a4f9-5e9ae62767e9', 40, 12050, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('15eeb733-bfeb-4f79-bf77-541e767a5301', '88b9f4fc-42b3-4f9e-a4f9-5e9ae62767e9', 45, 11450, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('044e2178-3e6c-488a-a4a0-7ada203ee112', '88b9f4fc-42b3-4f9e-a4f9-5e9ae62767e9', 50, 11300, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('c6ce9a05-381f-4a62-b3f7-a54eeae32b49', '88b9f4fc-42b3-4f9e-a4f9-5e9ae62767e9', 55, 11100, 'INR');
-- --------------------------------------------------------
-- Trip: FWN116 -  AGRA - AMRITSAR - CHANDIGARH - DELHI - 5N / 6D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('d139e8e4-7f8c-4d5b-990f-abb192a390cb', 'FWN116', 'FWN116 -  AGRA - AMRITSAR - CHANDIGARH - DELHI - 5N / 6D', 'NORTH', 6, 5, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('b7e0c0b1-544d-4b8d-a144-a0f24e4c4296', 'd139e8e4-7f8c-4d5b-990f-abb192a390cb', 20, 8, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('069a34d3-fabf-4b81-8d46-6876b31aa148', 'd139e8e4-7f8c-4d5b-990f-abb192a390cb', 25, 9, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('72e55a5c-280f-4c72-a535-063954e7860b', 'd139e8e4-7f8c-4d5b-990f-abb192a390cb', 30, 10, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('a7d2736f-b6ac-4b63-a025-d1ce0d6eee24', 'd139e8e4-7f8c-4d5b-990f-abb192a390cb', 35, 12, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('4be96fc2-c890-446c-809e-c102f1ef5f96', 'd139e8e4-7f8c-4d5b-990f-abb192a390cb', 40, 13, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('490ad156-a493-470f-a2da-019aa88c2ec0', 'd139e8e4-7f8c-4d5b-990f-abb192a390cb', 45, 14, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('3192f1a7-89ae-4fae-b218-d12f29202ac6', 'd139e8e4-7f8c-4d5b-990f-abb192a390cb', 50, 15, 'INR');
-- --------------------------------------------------------
-- Trip: FWN117 -  AGRA - JPR - DELHI - MANALI - 6N / 7D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('06a56da1-9f14-4c3c-b288-09b2277d73f4', 'FWN117', 'FWN117 -  AGRA - JPR - DELHI - MANALI - 6N / 7D', 'NORTH', 7, 6, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('b8d0dc0b-8ac1-41a7-b4fe-e085db0151f5', '06a56da1-9f14-4c3c-b288-09b2277d73f4', 20, 13900, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('e2fb4de2-f751-45fc-82be-5c3c453e6f7f', '06a56da1-9f14-4c3c-b288-09b2277d73f4', 25, 12550, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('91b32900-0e1d-4961-a01d-1c08c45abf8d', '06a56da1-9f14-4c3c-b288-09b2277d73f4', 30, 11950, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('b132e0bc-9ca5-4aeb-8812-f69b7486c837', '06a56da1-9f14-4c3c-b288-09b2277d73f4', 35, 11500, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('85b27fa0-ba2f-4041-ae46-90c682ad9255', '06a56da1-9f14-4c3c-b288-09b2277d73f4', 40, 10900, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('1bb38fac-0d69-43c2-9a7e-8446ffb84da1', '06a56da1-9f14-4c3c-b288-09b2277d73f4', 45, 10300, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('4cc453ed-9797-4a7b-bcfe-1432a8116819', '06a56da1-9f14-4c3c-b288-09b2277d73f4', 50, 10050, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('9960f7ba-a6af-462f-8a34-55dc3a856994', '06a56da1-9f14-4c3c-b288-09b2277d73f4', 55, 9800, 'INR');
-- --------------------------------------------------------
-- Trip: FWN118 -  AGRA - JPR - DELHI - MANALI - AMRITSAR - 7N / 8D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('ed57fbd8-9c28-49cc-849a-38435c49a1f2', 'FWN118', 'FWN118 -  AGRA - JPR - DELHI - MANALI - AMRITSAR - 7N / 8D', 'NORTH', 8, 7, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('fa4e50f4-64a8-4b61-9a87-4e566d995e67', 'ed57fbd8-9c28-49cc-849a-38435c49a1f2', 20, 15800, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('1bdce2dd-a0bb-438b-b51a-a3035fd132ae', 'ed57fbd8-9c28-49cc-849a-38435c49a1f2', 25, 14300, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('97f986f3-53fa-418d-ba2e-f8b3bee3a257', 'ed57fbd8-9c28-49cc-849a-38435c49a1f2', 30, 13800, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('675ddea3-95d2-4094-9e09-730af108649d', 'ed57fbd8-9c28-49cc-849a-38435c49a1f2', 35, 13100, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('45d8c01f-3bc0-40dd-9076-b4c89539c393', 'ed57fbd8-9c28-49cc-849a-38435c49a1f2', 40, 12400, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('d95d52a4-67c8-4b46-a16f-3efec56602d7', 'ed57fbd8-9c28-49cc-849a-38435c49a1f2', 45, 11800, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('78888c55-980b-4df4-b237-636e0dfbd5ad', 'ed57fbd8-9c28-49cc-849a-38435c49a1f2', 50, 11500, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('cdf99dc7-372f-49ac-bfce-f6158bd54363', 'ed57fbd8-9c28-49cc-849a-38435c49a1f2', 55, 11200, 'INR');
-- --------------------------------------------------------
-- Trip: FWN119 -  AGRA - JPR - DELHI - MANALI - KASOL - AMRITSAR - 9N / 10D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('98706ed4-c7c4-4377-bcc1-d82d625492fa', 'FWN119', 'FWN119 -  AGRA - JPR - DELHI - MANALI - KASOL - AMRITSAR - 9N / 10D', 'NORTH', 10, 9, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('bbbd986c-d9df-4df3-b9ee-c04d5840bf5a', '98706ed4-c7c4-4377-bcc1-d82d625492fa', 20, 18900, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('4c76f320-4de6-4e8e-a7b5-54e90a3bcec3', '98706ed4-c7c4-4377-bcc1-d82d625492fa', 25, 17250, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('ea73a9c8-a7cb-4f7d-bf7a-8a1ef2071cf5', '98706ed4-c7c4-4377-bcc1-d82d625492fa', 30, 16700, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('2720121b-1190-4c2a-b7bc-9811cbd9c93b', '98706ed4-c7c4-4377-bcc1-d82d625492fa', 35, 15900, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('26534cad-cca2-4569-bb19-3636cb7d8518', '98706ed4-c7c4-4377-bcc1-d82d625492fa', 40, 15100, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('a901f16b-aaba-4f90-86a7-fedb0aa96571', '98706ed4-c7c4-4377-bcc1-d82d625492fa', 45, 14500, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('0a40c9a8-5888-4c38-b169-051a51e37813', '98706ed4-c7c4-4377-bcc1-d82d625492fa', 50, 14100, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('2075bcd1-9510-4358-8164-3133e722f97b', '98706ed4-c7c4-4377-bcc1-d82d625492fa', 55, 13800, 'INR');
-- --------------------------------------------------------
-- Trip: FWN120 -  AGRA - MATHURA - DELHI - MANALI - KASOL - 7N / 8D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('bca4e59d-d442-4de3-afe1-01b4d5834912', 'FWN120', 'FWN120 -  AGRA - MATHURA - DELHI - MANALI - KASOL - 7N / 8D', 'NORTH', 8, 7, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('cdc694b6-3df1-4687-bd53-83bcf0fc1e54', 'bca4e59d-d442-4de3-afe1-01b4d5834912', 20, 14600, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('6646eac7-2c07-4437-a2af-b4ef36f76bfa', 'bca4e59d-d442-4de3-afe1-01b4d5834912', 25, 13200, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('40a05290-6462-4490-8711-c8b38f5f227c', 'bca4e59d-d442-4de3-afe1-01b4d5834912', 30, 12900, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('aa2f403f-89a7-4458-970c-532254a00de9', 'bca4e59d-d442-4de3-afe1-01b4d5834912', 35, 12300, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('48df40ed-cc2f-4e62-994f-c1c66c110e7b', 'bca4e59d-d442-4de3-afe1-01b4d5834912', 40, 11750, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('c960aefb-ee33-4c92-8ac4-5d681036458a', 'bca4e59d-d442-4de3-afe1-01b4d5834912', 45, 11200, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('16bc7b11-3ffd-4e39-a42a-30fe03c72e7d', 'bca4e59d-d442-4de3-afe1-01b4d5834912', 50, 10900, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('63a5e75f-ca21-44ad-a31b-22384d199859', 'bca4e59d-d442-4de3-afe1-01b4d5834912', 55, 10700, 'INR');
-- --------------------------------------------------------
-- Trip: FWN121 - AMRITSAR - DELHI - AGR - 5N / 6D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('92ff63f6-0df7-4139-8c1b-3264550d3370', 'FWN121', 'FWN121 - AMRITSAR - DELHI - AGR - 5N / 6D', 'NORTH', 6, 5, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('9fc0808d-3e1c-42ff-b52c-1a24184b282f', '92ff63f6-0df7-4139-8c1b-3264550d3370', 20, 11800, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('1cc0fb22-4b2b-48f8-b7f1-d4913625395f', '92ff63f6-0df7-4139-8c1b-3264550d3370', 25, 11200, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('b649711f-32da-4591-a490-dca0bdf995e3', '92ff63f6-0df7-4139-8c1b-3264550d3370', 30, 10300, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('883cee04-cb6b-4f70-880d-aa85b6fef1e6', '92ff63f6-0df7-4139-8c1b-3264550d3370', 35, 9850, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('61e8ceba-a6d8-4ba0-ab60-f57efbc4df57', '92ff63f6-0df7-4139-8c1b-3264550d3370', 40, 9400, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('22fe82bb-b9f1-4d47-8997-16e88f796ad1', '92ff63f6-0df7-4139-8c1b-3264550d3370', 45, 9200, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('2eda567f-047c-44f1-8f4b-53e3886e279a', '92ff63f6-0df7-4139-8c1b-3264550d3370', 50, 8900, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('ae86aace-8fa6-4ecf-9291-820807d0a633', '92ff63f6-0df7-4139-8c1b-3264550d3370', 55, 8600, 'INR');
-- --------------------------------------------------------
-- Trip: FWN 130 - DELHI  - SHIMLA - MANALI -  5N / 6D
-- --------------------------------------------------------
INSERT INTO trips (id, code, title, region, duration_days, duration_nights, is_active) 
VALUES ('0fcc0575-42be-4e29-b3da-7db7072aa997', 'FWN130', 'FWN 130 - DELHI  - SHIMLA - MANALI -  5N / 6D', 'NORTH', 6, 5, true) ON CONFLICT (code) DO NOTHING;

INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('f5c789c2-1f7a-4dc5-a849-f66dcb8d04d9', '0fcc0575-42be-4e29-b3da-7db7072aa997', 20, 7, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('a3553f69-78ec-4eed-92d4-7a51402dc8a5', '0fcc0575-42be-4e29-b3da-7db7072aa997', 25, 8, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('736fe6fd-9d88-42f2-a60e-2b06392c6950', '0fcc0575-42be-4e29-b3da-7db7072aa997', 30, 9, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('d9a3f8a6-796f-42ea-b31c-ccea362de66f', '0fcc0575-42be-4e29-b3da-7db7072aa997', 35, 10, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('84a5c765-0f47-4bef-a327-84ee6fca6e1e', '0fcc0575-42be-4e29-b3da-7db7072aa997', 40, 12, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('a8af4b42-178c-4467-9d44-f6ca76ff2db0', '0fcc0575-42be-4e29-b3da-7db7072aa997', 45, 13, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('fd67413e-e105-4201-854f-7a989db43515', '0fcc0575-42be-4e29-b3da-7db7072aa997', 50, 14, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('9539c246-ff9e-4c5c-8ba7-943a4c471a57', '0fcc0575-42be-4e29-b3da-7db7072aa997', 55, 15, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('af7a5009-bc18-49d3-b4d9-32fa23c5ca7a', '0fcc0575-42be-4e29-b3da-7db7072aa997', 20, 14800, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('4f1d32e5-7aff-4458-9a98-685a2031a1b5', '0fcc0575-42be-4e29-b3da-7db7072aa997', 25, 13700, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('71726ccb-72f0-4220-ba17-dd25458fa7d2', '0fcc0575-42be-4e29-b3da-7db7072aa997', 30, 13000, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('c0a9feae-d4c4-4d88-a26d-bed13071b723', '0fcc0575-42be-4e29-b3da-7db7072aa997', 35, 12300, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('77996562-1134-4304-a91e-a73b8dd39fa2', '0fcc0575-42be-4e29-b3da-7db7072aa997', 40, 11600, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('d1bee571-5ef7-4d45-b952-daae2fdf2879', '0fcc0575-42be-4e29-b3da-7db7072aa997', 45, 11100, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('9908e006-5471-4dc6-a451-d2d2f1748ec5', '0fcc0575-42be-4e29-b3da-7db7072aa997', 50, 10800, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('04734e8d-6779-43bf-8909-6bf0ccab96db', '0fcc0575-42be-4e29-b3da-7db7072aa997', 55, 10600, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('2f737e03-8118-4e82-83c9-0a471019b4d1', '0fcc0575-42be-4e29-b3da-7db7072aa997', 20, 15800, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('bf144cc7-1106-4427-8a45-bc739029489b', '0fcc0575-42be-4e29-b3da-7db7072aa997', 25, 14700, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('f64e987d-c0aa-4bbc-a4d2-83fc122c479d', '0fcc0575-42be-4e29-b3da-7db7072aa997', 30, 14000, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('54832fd6-07ce-4b37-8acb-ca7e5e235897', '0fcc0575-42be-4e29-b3da-7db7072aa997', 35, 13300, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('1f912f32-9059-4e62-9ff2-447d79b8ca15', '0fcc0575-42be-4e29-b3da-7db7072aa997', 40, 12600, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('f5c0db09-1aba-4980-8e9a-7b080c1a08eb', '0fcc0575-42be-4e29-b3da-7db7072aa997', 45, 11900, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('7d4641a2-6c2b-4949-a046-6b15816f1f37', '0fcc0575-42be-4e29-b3da-7db7072aa997', 50, 11700, 'INR');
INSERT INTO trip_pricing (id, trip_id, min_pax, price_per_person, currency) 
VALUES ('42e31648-58b7-4b65-bcff-34d38392c753', '0fcc0575-42be-4e29-b3da-7db7072aa997', 55, 11500, 'INR');
