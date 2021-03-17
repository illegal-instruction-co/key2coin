# key2coin
key2coin

Start run_development.vbs

# NOT
ağdaki son blok hiç bir zaman kimse ile paylaşılmaz.

# TO DO
sales ve redeem tablolari kaldirilacak
onlarin yerine
safes ve vouches tablolari olusturulacak


ornek icerikleri:

```
concept: 'Safe',
chain: '{\n' +
  '    "blockchain": [\n' +
  '        {\n' +
  '            "index": 0,\n' +
  '            "timestamp": "15/03/2021",\n' +
  '            "data": ".Initial signature of Key2Coin.",\n' +
  '            "precedingHash": "0",\n' +
  '            "hash": "f2598437eb280cfc95be903a49b217eec0744291478b81ff0efb73678f0e0141"\n' +
  '        },\n' +
  '        {\n' +
  '            "index": 1,\n' +
  '            "timestamp": "15/03/2021",\n' +
  '            "data": {\n' +
  '                "crypto_name": "BTC",\n' +
  '                "crypto_voucher_total": 55.05,\n' +
  '                "payment_total": 57.02\n' +
  '            },\n' +
  '            "precedingHash": "f2598437eb280cfc95be903a49b217eec0744291478b81ff0efb73678f0e0141",\n' +
  '            "hash": "95c3247d5a2f2e6977ca5b35be67c1ffc2e487ed9c71670b77abb218c4e9d205"\n' +
  '        },\n' +
  '        {\n' +
  '            "index": 2,\n' +
  '            "timestamp": "15/03/2021",\n' +
  '            "data": {\n' +
  '                "crypto_name": "ETH",\n' +
  '                "crypto_voucher_total": 21.05,\n' +
  '                "full_name": "Daniel Leinad"\n' +
  '            },\n' +
  '            "precedingHash": "95c3247d5a2f2e6977ca5b35be67c1ffc2e487ed9c71670b77abb218c4e9d205",\n' +
  '            "hash": "f32cf51d6774e65afcea15072ca5ec44f769f79c491ecadcf6ad539da0162d5c"\n' +
  '        }\n' +
  '    ]\n' +
  '}'
}
K2C [LOG] {
concept: 'Voucher',
chain: '{\n' +
  '    "blockchain": [\n' +
  '        {\n' +
  '            "index": 0,\n' +
  '            "timestamp": "15/03/2021",\n' +
  '            "data": ".Initial signature of Key2Coin.",\n' +
  '            "precedingHash": "0",\n' +
  '            "hash": "f2598437eb280cfc95be903a49b217eec0744291478b81ff0efb73678f0e0141"\n' +
  '        },\n' +
  '        {\n' +
  '            "index": 1,\n' +
  '            "timestamp": "16/03/2021",\n' +
  '            "data": {\n' +
  '                "hash": "95c3247d5a2f2e6977ca5b35be67c1ffc2e487ed9c71670b77abb218c4e9d205"\n' +
  '            },\n' +
  '            "precedingHash": "f2598437eb280cfc95be903a49b217eec0744291478b81ff0efb73678f0e0141",\n' +
  '            "hash": "27eb6f09d7ce7dfe8cbc98dfe1202a13ece094a941142ad6c25770c2f4e60520"\n' +
  '        },\n' +
  '        {\n' +
  '            "index": 2,\n' +
  '            "timestamp": "16/03/2021",\n' +
  '            "data": {\n' +
  '                "hash": "f32cf51d6774e65afcea15072ca5ec44f769f79c491ecadcf6ad539da0162d5c"\n' +
  '            },\n' +
  '            "precedingHash": "27eb6f09d7ce7dfe8cbc98dfe1202a13ece094a941142ad6c25770c2f4e60520",\n' +
  '            "hash": "928286372f5a69d2a0ed61fb2b6fe117f2e266dc9e6f17369c00d0294f455e3a"\n' +
  '        }\n' +
  '    ]\n' +
  '}'
  ```
