# PacketNotes(working title)

## Status
Very early development.

## Description
A note orgaization app. Some combination of Simplenote, Workflowy, Fetchnotes.

## API
Notes can be stored/imported in string format.

Ex:

    The quick brown fox jumped over the lazy dog. #animals #jumping

The processed version will be stored as an JSON like object.

    {
      text: "The quick brown fox jumped over the lazy dog. #animals #jumping",
      tags: [
        "#": [
          "animals",
          "jumping"
        ]
      ],
      keywords: [
        "animals",
        "jumping"
        ... + non common words from text ...
        "quick",
        "brown",
        "fox",
        ...
      ],
    }

## Index

Tag index

    {
      "#": {
        "animals": [
          ...note ID...,
          32,
          43,
        ],
        "jumping": [
          12,
          56,
          90
        ]
      },
      "@": {
        "work",
        "home",
        "store",
        "workshop",
        "internet"
      }
    }

Keyword index (main search?)

    {
      "a": {
        "a": {},
        "b": {},
        ...
        "n": {
          "i": {
            "m": {
              "a": {
                "l": {
                  "s": {
                    "animals": [
                      12,
                      23
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }
