const _uuids = Object.freeze([
  "e0fafee8-de80-4d60-9fba-0e24de2474bb",
  "79eaeee9-eb98-4949-8872-412d8419990f",
  "a21fe10e-f968-4bd5-b0db-0b4d097d7d23",
  "5783f8dc-59df-4006-af49-57f486dde55a",
  "26eb22b7-5f2d-4ae1-b02c-1ef12f0da810",
  "9a46e5bc-b8a6-43fe-bda2-8fdf764608cd",
  "d36d2e10-2d69-43de-9761-f82cef12172d",
  "a38cdb0c-86d9-4a68-ae99-626a6d497504",
  "87301521-aacc-483c-833c-d52f255d3fb2",
  "88fbabb3-8180-42ac-928c-74f21a07bbd5",
  "ac02e83b-cf5a-4c98-808a-a504772697f7",
  "01035092-f5c8-4fd6-9160-3ee0752e8fff",
  "6736f47b-f1c9-4633-8e0e-5c341a453878",
  "392ba9c5-9e2d-4eab-b376-64e10533ebf0",
  "6aa1ce3d-8157-45f9-a702-2f5eaf07ab7d",
  "b45184c9-45ba-4295-94ac-24a0c503e4e2",
  "2629de8d-b8cd-4c4c-b14f-c511322b21f5",
  "d073799b-c612-4084-b0d9-7bd4f4596b76",
  "a223aaf8-292b-4414-bb7a-ff416257e113",
  "b96358e2-56d2-49ff-acb2-52bb96427f8e",
  "eab8affb-8df4-464a-9387-e358e0e14908",
  "50d6b458-0e02-4b14-92d8-6dfe0ff5c7a7",
  "4ac99374-4602-462c-978b-66aa4705d71a",
  "77c61353-b116-4f30-82a2-c575f3192104",
  "e78cfd45-0c60-4b92-9aa4-4cb1fb734920",
  "ff17d127-1071-452b-ba78-9a9d3ebdc239",
  "5e17253f-99a1-454b-b220-633834dd7eb0",
  "0bf21c90-b6c8-474c-bed4-3a367e1b3468",
  "710fd766-de5f-4749-bf0b-eb9e571bfef6",
  "84b3f3d8-56f2-4655-9b49-ac1d88e2954e",
  "4c516dc4-636a-40a1-bb91-b41ddb8a8eda",
  "9c278fa4-bc98-4105-9bd7-dbd1c060a065",
  "a56f6edb-e343-400a-b630-b745a83178eb",
  "90866455-ec17-4d14-ac28-6337ea1e4eaf",
  "5c1a5a26-670e-4274-89e0-b1f3d9cc2b19",
  "52bf62a4-2594-4409-9efc-81d7c5745c12",
  "6fb1df40-4b79-45f1-b01c-e06297275553",
  "3660c79e-f707-4ca0-b72b-2d631f9fcfd1",
  "74e45908-6885-4430-a527-f01c9b2e8886",
  "805c9530-37da-4110-9f9b-1f6ffb6fd261",
  "ec25fc2a-9e81-4470-af16-603d2a5c08f5",
  "8db143e9-24ba-43d4-b4c7-172e90c39908",
  "f119b577-fb1a-42c0-86bf-0f86973aa749",
  "7c545d5d-037f-4051-bee8-99757d789b61",
  "010ef0b0-49cd-4273-a5c6-495b019f32d5",
  "7274cb43-da05-4e9b-a1ab-9824211ad080",
  "fa45956b-023c-41c0-bf0e-082d8c50f642",
  "fad1be2a-6562-4c69-b388-52c5213d10de",
  "7a0c0ba7-33f9-4e81-b2ed-5f9472ab1efb",
  "713932e0-b74a-4635-b31e-d30923619063",
  "3dd8c691-9f5f-4dde-a065-f546c3271fa2",
  "8fac8190-30ff-4128-ad63-534acc9a5f81",
  "0bff8a62-094c-46c3-8a5e-a073cbfc0e99",
  "0f229c1b-5af9-4fc3-8e25-66503a7909fe",
  "6a62eb8a-36a8-49ab-984b-0fa39d0c3642",
  "d0607460-e128-429f-99f9-da63db8ee682",
  "40763439-d7cf-4dc5-a825-40f1dfaeccc3",
  "f386aec8-85ee-4826-bb81-5ca618a7b9d3",
  "856048a1-add0-4a14-9c70-7fed151a158b",
  "aea0f535-e5d4-4992-8f95-e31b58a8c71f",
  "7a0e4802-e9cd-44cb-91a1-1dde5d4ee9bf",
  "d1cf7ffe-01c9-44ef-9116-990ee03df545",
  "22a2f9e6-4ec7-400b-a57f-e5c83ba88404",
  "99367224-33f2-448b-a9ed-84bdaacf430e",
  "53105ec9-44d3-467c-8ffe-a3bb577dfc29",
  "19f2bb4e-951b-44f8-88e1-2da5ea85edc2",
  "fc87cc55-611c-46fb-97f7-856373beae6a",
  "7bbc8f54-095d-4bfb-b01f-f04ee451b670",
  "1fdbee57-b83d-4e40-9e2e-acfc5931dab9",
  "2186b535-cde8-4af7-973d-1a4b3a37059c",
  "414478d2-3832-4b82-9d5f-c2a92bde4e8e",
  "0c44751f-8b3e-478c-a68d-f3421fd23b56",
  "2d824bad-791e-4083-aeeb-d6616dd94a73",
  "c1b3d6a3-3fba-4a6e-b342-1d0bb3903803",
  "797e966e-de7b-4532-91e0-6ac340c87768",
  "68b13899-eee6-4ca5-b4bc-99500187bcc3",
  "0944136f-6edb-4e00-88ad-234a796302ba",
  "4cf69f10-ca0f-489f-a24e-14385284a92f",
  "43ed1b36-255b-424e-aba8-d182546aa9f1",
  "455f1344-a55c-4e49-b2cc-df481374f861",
  "fbce4a34-3464-44a1-9120-b7727a152b21",
  "35e968dc-d75f-4e3b-a593-1861a290ef20",
  "a9997f17-68e8-4012-9a52-608509019da9",
  "7fe59c8c-c597-4e3e-bf8e-bae85ff994b5",
  "f5421324-79a1-471a-b0d3-c67c52d0f95f",
  "6273d57b-6f44-4552-9891-3b35ce47d0bd",
  "c082921b-5704-49c5-8840-0fcf9eb749d0",
  "b81f56ec-7f27-4a6b-8abc-c692879c4a0c",
  "d89a05b4-d8b4-45c8-97fd-b746a2621762",
  "2a7beb27-facb-4847-9c8c-9590e73a8d27",
  "855755bf-d882-434b-8ecb-c5c53db238e0",
  "6c0c8895-594d-4e53-a816-9239cf4eefed",
  "c7a492ec-4fa0-4dd5-85a1-0840ad2f3c85",
  "b93edbb5-3152-4071-8ebb-94ae76c8a9af",
  "dbd5232e-7815-4541-81ea-7a7a8f9c892e",
  "ef6088a3-a7a8-4b9c-8b97-4b1bc67d7bab",
  "c9f84a75-cdcc-4fdf-b1fb-562c09a36c13",
  "16969ef0-47d9-4a8a-a2f6-6b9db091d42e",
  "592cad23-092c-42f8-85ff-e22ad3e5a2e8",
  "730942cc-b8df-4e7f-804a-6def4a9f7115",
  "bb9d550a-1e2c-4993-9408-9bfd9f770e1d",
  "b11bbcfc-09ad-4b99-9225-1e547e3b3d9f",
  "1270f827-b424-4abb-a430-df2b58fbd3bc",
  "ede51e74-17f8-4b09-9844-e1768b267d5d",
  "9c8bebe2-6130-4be3-acc1-1bdfc93dbb96",
  "38ad0f4e-3c76-4aa0-848a-5fc6f89c44f0",
  "9a37fde7-c017-462f-95d2-78cc25cc6df5",
  "b13088de-80b7-404f-be5e-7ebea9d45cfd",
  "49f5ef9f-31b8-4ef7-8f5c-83eb9243f519",
  "665fc14f-3b77-4f7e-9f86-c3e53f6b1505",
  "072e0b6c-ce2e-44fc-a3c3-cd80991f4530",
  "54000e67-3009-40e5-8fb8-9c7d64a5ade6",
  "eec4e827-703c-4215-b3e4-02be9bd79ee7",
  "445de8c5-4034-41e5-8c8d-f1fdf7ede12d",
  "c45773c5-a5c8-427a-be54-15b4d894377d",
  "d3341d12-0ee6-470a-b5ef-a3320b5fe468",
  "fb1a0685-e771-4e66-9245-a38daff013b3",
  "4c7b91fb-f2e3-47d2-b39d-c5c5152190ed",
  "eba81df9-e21e-4e0b-8c4f-4e06cb411382",
  "1c07507b-9978-4488-bd91-37d472d8c05d",
  "0cb40035-5eeb-4015-a2c6-9c86d06edc19",
  "05e86d08-bd06-4200-b506-19333f8530df",
  "c1d96b11-96c5-4406-848d-25061ffcd38a",
  "251752ba-e9a4-409d-90f0-bc20c6cbf324",
  "2e742b71-9cff-4cb2-a36e-d0f83e90ee61",
  "883e7b00-d7df-40da-8523-2c46c9fc3d50",
  "9f6aa3d3-7fb9-4d16-8ffb-e0bb7c555bc3",
  "de3b1b48-4ae9-4643-acf4-feb7243f6c45",
  "2c6eb402-f162-4a5e-9a90-41f292b0b72a",
  "b7b2324c-06b6-426a-99ab-5b3d86685c73",
  "d408f780-4dc4-4ca5-840f-07041291b595",
  "280aa0f7-75ba-41be-8d01-eb5956fe5f4b",
  "250c3866-1dba-4147-afbe-46448d8a5ee5",
  "e9ee439d-2fd6-4028-a165-b3d75b902cad",
  "191c57e2-5fc8-4d4e-b896-38ae49b5a7c3",
  "a20acf77-2eec-4cc1-bdd8-48a0b484c718",
  "fe238c60-791e-4f45-b433-a02ddb12d0bc",
  "1cee6ad1-d368-4d24-b113-68b473ced258",
  "f932d452-518d-4b1a-8d95-ec8f052f8753",
  "1a7e4d0b-8d9a-4427-b25d-5e755ec85bea",
  "380ebf82-9e10-42a7-b248-6ff35c2992de",
  "a2533413-79dc-4b96-ba21-421356af164c",
  "26970e16-ae9c-4096-9f04-5924e283624c",
  "707227ea-8e4a-4d44-946c-15c911de3be3",
  "eb0c6606-5cea-43c0-8471-f264b8aa3f39",
  "a622c444-9306-4dab-b203-8aa986df3d19",
  "53d23c10-2327-4c33-869e-e8f4ac183e93",
  "ef4820ae-c133-4f5e-bee8-ac182a8a3fef",
  "51a1d8aa-6ebb-425b-9896-ad793008dc9e",
  "93403b91-7c5c-412f-8448-367325bb02c4",
  "99ad25be-84f1-4ede-9fb2-e1e1f7575847",
]);

type Result<T extends string> = {
  [key in `${T}Id`]: string;
} & {
  [key in `${T}Index`]: number;
};

/**
 * generate static uuid v4
 * @example
 * const { user1Id } = getFullNamedId("user1");
 */
export function getFullNamedId<T extends string>(
  baseName: T,
  index = 0,
): Result<T> {
  const result = {
    [baseName + "Id"]: _uuids[index],
    [baseName + "Index"]: index,
  } as Result<T>;
  if (!(result as any)[baseName + "Id"]) {
    throw new Error(
      "no id, please add more static uuidsV4 to the _uuids array",
    );
  }
  index++;
  return result;
}

export function getId(index = 0) {
  const result = _uuids[index];

  if (!result) {
    throw new Error(
      "no id, please add more static uuidsV4 to the _uuids array",
    );
  }

  index++;
  return result;
}

// import { randomUUID } from "crypto";
// import fs from "fs";

// const ids = [];
// for (let i = 0; i < 150; i++) {
//   ids.push('"' + randomUUID() + '"');
// }
// fs.writeFileSync("./ids2.ts", "const ids = [" + ids.join(",") + "]", "utf-8");
