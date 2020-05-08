# RADON encoding

[RADON scripts][RADON] are encoded using [CBOR], a very
efficient, compact and widely supported data structure encoding.

Look for example at this succinct (28 bytes) serialized RADON script:
```ts
// As Hex string
8618431874821861677765617468657218748218616474656D701872

// As Base64 string
"hhhDGHSCGGFnd2VhdGhlchh0ghhhZHRlbXAYcg=="

```

Once decoded, the resulting structure will represent this RADON script:
```ts
[
    STRING_PARSEJSON,       // 0x45
    MIXED_ASMAP,            // 0x74
    [ MAP_GET, "weather" ], // [ 0x61, "weather" ]
    MIXED_ASMAP,            // 0x74
    [ MAP_GET, "temp" ],    // [ 0x61, "temp" ]
    MIXED_ASFLOAT           // 0x72
]
```

!!! tip
    RADON scripts are pure byte code sequences, and at the same time represent high-level abstractions.
    In the Javascript-like representation of RADON that the [Witnet Truffle box][tutorial] uses, the script above may resemble:
    
    ```ts
    new Witnet.Script()
        .parseJSON()
        .asMap()
        .get("weather")
        .asMap()
        .get("temp")
        .asFloat()
    ```

!!! info "Constants"
    All across this documentation, unquoted uppercase names like `STRING_PARSEJSON` identify different operators and
    constants that equate to a single byte when encoded.

    A list of constants can be found in the [Constants section][constants].

[radon]: /data-requests/overview/#rad-object-notation-radon
[constants]: /data-requests/constants
[CBOR]: https://cbor.io
[tutorial]: /tutorials/bitcoin-price-feed/introduction/
