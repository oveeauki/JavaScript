export function createQuery(substanceName) {
  return `
{
  substances(query: "${substanceName}") {
    name
    roas {
      name
      dose {
        units
        threshold
        heavy
        common {
          min
          max
        }
        light {
          min
          max
        }
        strong {
          min
          max
        }
      }
      duration {
        afterglow {
          min
          max
          units
        }
        comeup {
          min
          max
          units
        }
        duration {
          min
          max
          units
        }
        offset {
          min
          max
          units
        }
        onset {
          min
          max
          units
        }
        peak {
          min
          max
          units
        }
        total {
          min
          max
          units
        }
      }
      bioavailability {
        min
        max
      }
    }
    effects {
      name
      url
    }
  }
}`;
}
