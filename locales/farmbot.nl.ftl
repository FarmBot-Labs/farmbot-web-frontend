# --------------------------------------------------- #
# FarmBot localization uses the Mozilla L20n project.
# Visit http://l20n.org/learn/ for more information.
# --------------------------------------------------- #
# Localization: nl (Nederlands (Dutch))
# Localized by: Marc Dingena, https://github.com/mdingena
# --------------------------------------------------- #


[[Captions]]

CAPTION_zero  = Nee
CAPTION_false = Nee
CAPTION_off   = Nee
CAPTION_one   = Ja
CAPTION_true  = Ja
CAPTION_on    = Ja
CAPTION_undef = ---


[[Navigation Bar]]

nav-sync           = Sync
nav-e-stop         = Noodstop
nav-logout         = Uitloggen
nav-link-designer  = Ontwerper
nav-link-controls  = Besturing
nav-link-devices   = Apparatuur
nav-link-sequences = Instructiesets
nav-link-regimens  = Regimes


[[Ticker Messages]]

ticker-LOGIN_REQUIRED     = Gelieve in te loggen
ticker-LOGIN_OK           = Ingelogd
ticker-LOGIN_ERR          = Foute login
ticker-FETCH_PLANTS_START = Planten ophalen
ticker-FETCH_PLANTS_OK    = Planten opgehaald
ticker-FETCH_PLANTS_ERR   = Fout bij ophalen planten
ticker-FETCH_SEQUENCES_OK = Instructiesets opgehaald
ticker-READ_STATUS_OK     = Bot status OK
ticker-FETCH_DEVICE_ERR   = Geen verbinding met MQTT server
ticker-READ_STATUS_ERR    = Geen verbinding met bot
ticker-BOT_NOTIFICATION   = Bericht ontvangen
ticker-COMMAND_OK         = Bericht afgeleverd


[[Login Page, Login Widget]]

login-header         = Inloggen
login-email          = Email
login-password       = Wachtwoord
login-password-reset = Wachtwoord opnieuw instellen
login-submit         = Inloggen
login-server-url     = Server URL (Geavanceerd)


[[Login Page, Register Widget]]

register-header          = Creëer een Account
register-email           = Email
register-name            = Naam
register-password        = Wachtwoord
register-password-verify = Wachtwoord (Nogmaals)
register-submit          = Creëer Account


[[Controls Page, Move Widget]]

controls-move-header = Verplaatsen
controls-move-help   =
  | Gebruik deze knoppen om FarmBot handmatig direct aan te
  | sturen. Druk op de pijlen voor relatieve verplaatsing of
  | voer nieuwe coördinaten in en druk op <strong>{ controls-move-go }</strong> voor absolute
  | verplaatsing. Tip: Druk op de { controls-move-home } knop wanneer u klaar
  | bent zodat FarmBot zich gereed maakt om zijn werk te
  | vervolgen.
  | NB: Momenteel werken alle knoppen behalve { controls-move-home }.
controls-move-e-stop = Noodstop
controls-move-amount = Verplaatsafstand (mm)
controls-move-axis-x = X-As
controls-move-axis-y = Y-As
controls-move-axis-z = Z-As
controls-move-go     = Ga
controls-move-home   = Home


[[Controls Page, Tools Widget]]

controls-tools-header = Koppelstukken
controls-tools-help   =
  | Gebruik deze schakelknoppen om FarmBot's koppelstukken
  | en randapparatuur direct aan te sturen. Druk op <strong>{ controls-tools-edit }</strong>
  | om koppelstukken te bewerken of aan te maken. Denk eraan
  | deze instellingen te herstellen wanneer u klaar bent met
  | uw handmatige handelingen!
  | Binnenkort: een werkende { controls-tools-edit } knop.
controls-tools-edit   = Wijzig
controls-tools-pin    = Pin { $pinId }


[[Controls Page, Tools Widget, Custom Tools]]

controls-tools-tool-vacuum_pump = Vacuümpomp
controls-tools-tool-water_valve = Waterklep
controls-tools-tool-led         = LED


[[Controls Page, Camera Widget]]

controls-camera-header = Camera
controls-camera-help   =
  | Druk op <strong>{ controls-camera-edit }</strong> om de URL van een live-stream van uw
  | FarmBot toe te voegen.
  | Binnenkort: een werkende { controls-camera-edit } knop en de mogelijkheid
  | om uw webcam URL in de server op te slaan.
controls-camera-edit   = Wijzig
controls-camera-url    = Webcam URL:


[[Sequences Page, Commands Widget]]

sequences-commands-header    = Commando's
sequences-commands-help      =
  | Deze commando's zijn de meest eenvoudige dingen die
  | FarmBot kan doen. Combineer deze om instructiesets te
  | maken die samen complexe handelingen uitvoeren voor
  | bijvoorbeeld planten water geven, zaden planten,
  | grondmetingen en meer.
  | Binnenkort: commando's klikken-en-slepen!
sequences-commands-move-abs  = Verplaats Absoluut
sequences-commands-move-rel  = Verplaats Relatief
sequences-commands-pin-write = Schrijf Pin
sequences-commands-pin-read  = Lees Pin
sequences-commands-wait      = Wacht
sequences-commands-message   = Zend Bericht
sequences-commands-if        = Keuze
sequences-commands-execute   = Uitvoeren


[[Sequences Page, Editor Widget]]

sequences-editor-header       = Instructieset Bewerken
sequences-editor-help         =
  | Gebruik dit venster voor het bewerken van instructiesets.
  | Binnenkort: stappen klikken-en-slepen, stappen hernoemen,
  | instructiesets klonen en erfbare stapeigenschappen!
sequences-editor-save         = Opslaan
sequences-editor-save-dirty   = Opslaan *
sequences-editor-test         = Test
sequences-editor-delete       = Verwijder
sequences-editor-name         =
  [html/placeholder]            Naam van instructieset
sequences-editor-landing-zone = Sleep commando's hier


[[Sequences Page, Editor Widget, Step Tiles]]

sequences-editor-step-label-move-abs  =
  [html/placeholder]                    { sequences-commands-move-abs }
sequences-editor-step-help-move-abs   =
  | Het { sequences-commands-move-abs } commando instrueert FarmBot om naar
  | de gespecificeerde coördinaten te verplaatsen ongeacht de
  | huidige positie. Bijvoorbeeld, als FarmBot zich momenteel
  | op X=100, Y=100 bevindt en een { sequences-commands-move-abs } commando
  | ontvangt met X=0 en Y=300, dan zal FarmBot zich verplaatsen
  | naar X=0 en Y=300. Als FarmBot zich in beide assen moet
  | verplaatsen, dan gebeurt dit diagonaal. Indien u wenst dat
  | FarmBot zich op slechts één as per beweging verplaatst,
  | gebruik dan meerdere { sequences-commands-move-abs } commando's.
  | Binnenkort: As-compensaties stellen u in staat FarmBot te
  | verplaatsen naar een bepaalde positie, maar deze met een
  | gespecificeerde compensatie te wijzigen. Bijvoorbeeld,
  | u specificeerd de locatie van een koppelstuk, en compenseert
  | FarmBot zodat hij vlak boven het koppelstuk uitkomt in plaats
  | van erin. Dankzij as-compensatie laat u FarmBot het rekenwerk
  | voor u doen.
sequences-editor-step-label-move-rel  =
  [html/placeholder]                    { sequences-commands-move-rel }
sequences-editor-step-help-move-rel   =
  | Het { sequences-commands-move-rel } commando instrueert FarmBot om de
  | gespecificeerde afstand vanaf de huidige coördinaten te
  | verplaatsen. Bijvoorbeeld, als FarmBot zich momenteel op
  | X=100, Y=100 bevindt en een { sequences-commands-move-rel } commando
  | ontvangt met X=-40 en Y=300, dan zal FarmBot zich verplaatsen
  | naar X=60 en Y=400. Als FarmBot zich in beide assen moet
  | verplaatsen, dan gebeurt dit diagonaal. Indien u wenst dat
  | FarmBot zich op slechts één as per beweging verplaatst,
  | gebruik dan meerdere { sequences-commands-move-rel } commando's.
  | Verplaats Relatief commando's behoren vooraf te worden gegaan
  | met een { sequences-commands-move-abs } commando om u te verzekeren dat
  | FarmBot vanaf een bekende absolute positie begint.
sequences-editor-step-label-pin-write =
  [html/placeholder]                    { sequences-commands-pin-write }
sequences-editor-step-help-pin-write  =
  | Het { sequences-commands-pin-write } commando instrueert FarmBot om de
  | gespecificeerde pin op de Arduino in te stellen naar
  | de opgegeven modus en waarde. Een sequences-step-pin-mode van 0 is
  | voor aan/uit controle, en een sequences-step-pin-mode van 1 is voor
  | PWM (pulse width modulation), ofwel pulsbreedtemodulatie.
sequences-editor-step-label-pin-read  =
  [html/placeholder]                    { sequences-commands-pin-read }
sequences-editor-step-help-pin-read   =
  | Het { sequences-commands-pin-read } commando instrueert FarmBot om de waarde
  | van de gespecificeerde pin uit te lezen.
  | Binnenkort: U geeft dit datapunt een label dat wordt
  | opgeslagen in uw account en dat u later weer kunt
  | opvragen.
sequences-editor-step-label-wait      =
  [html/placeholder]                    { sequences-commands-wait }
sequences-editor-step-help-wait       =
  | Het Wacht commando instrueert FarmBot om gedurende
  | de wachtperiode niets te doen. Gebruik dit in
  | combinatie met het { sequences-commands-pin-write } commando om voor
  | een bepaalde tijdsduur water te geven.
sequences-editor-step-label-message   =
  [html/placeholder]                    { sequences-commands-message }
sequences-editor-step-help-message    =
  | Het { sequences-commands-message } commando instrueert FarmBot om een
  | instelbaar bericht naar de logs te sturen. Dit kan u
  | helpen met het debuggen van uw instructiesets. Op den
  | duurt zult u in staat zijn om push berichten en emails
  | van uw FarmBot te ontvangen!
sequences-editor-step-label-if        =
  [html/placeholder]                    { sequences-commands-if }
sequences-editor-step-label-execute   =
  [html/placeholder]                    { sequences-commands-execute }


[[Sequences Page, Editor Widget, Step Tiles, Movement]]

sequences-step-move-speed    = Snelheid
sequences-step-move-x        = X (mm)
sequences-step-move-y        = Y (mm)
sequences-step-move-z        = Z (mm)
sequences-step-move-offset-x = X-Compensatie (mm)
sequences-step-move-offset-y = Y-Compensatie (mm)
sequences-step-move-offset-z = Z-Compensatie (mm)


[[Sequences Page, Editor Widget, Step Tiles, Pins]]

sequences-step-pin-id         = Pin-nummer
sequences-step-pin-value      = Waarde
sequences-step-pin-mode       = Pin-modus
sequences-step-pin-data-label = Datalabel


[[Sequences Page, Editor Widget, Step Tiles, Wait]]

sequences-step-wait-timeout = Tijd in milliseconden


[[Sequences Page, Editor Widget, Step Tiles, Messages]]

sequences-step-message-text = Bericht


[[Sequences Page, Editor Widget, Step Tiles, If-Statement]]

sequences-step-if = TBD


[[Sequences Page, Editor Widget, Step Tiles, Execute]]

sequences-step-execute-sequence             = Instructieset
sequences-step-execute-sequence-placeholder = Kies een instructieset (of sla een nieuwe op)


[[Sequences Page, List Widget]]

sequences-list-header = Instructiesets
sequences-list-help   =
  | Dit is een lijst van al uw instructiesets. Klik op
  | een set om deze te bewerken.
  | Binnenkort: instructiesets klonen en instelbare kleuren!
sequences-list-add    = Toevoegen
sequences-list-new    = Nieuwe Instructieset


[[Regimens Page, Scheduler Widget]]

regimens-scheduler-header          = Planner
regimens-scheduler-help            =
  | Gebruik de planner om instructiesets op bepaalde dagen
  | en tijdstippen in te plannen in uw regime.
regimens-scheduler-add             = Toevoegen
regimens-scheduler-sequence-label  = Instructieset
regimens-scheduler-sequence-select = Selecteer Instructieset
regimens-scheduler-time            = Tijd
regimens-scheduler-days            = Dagen
regimens-scheduler-week-row        = Week { $weekNumber }
regimens-scheduler-week-button     = Week


[[Regimens Page, Editor Widget]]

regimens-editor-header = Regime Bewerken
regimens-editor-help =
  | Met regimes kan FarmBot zorg dragen voor een plant gedurende
  | diens gehele levenscyclus. Een regime bestaat uit vele
  | instructiesets die op basis van de leeftijd van een plant zijn
  | gepland om uit te voeren. Regimes worden op planten toegepast
  | vanuit de tuinontwerper en kunnen worden hergebruikt voor
  | planten die op dezelfde of verschillende tijden groeien.
  | Op een plant kunnen meerdere regimes worden toegepast.
  | Binnenkort: regimes!
regimens-editor-save       = Opslaan
regimens-editor-save-dirty = Opslaan *
regimens-editor-delete     = Verwijder
regimens-editor-name       =
  [html/placeholder]         Naam van regime
regimens-editor-empty      = Klik op "{ regimens-list-add }" om een regime te bewerken.
regimens-editor-day        = Dag { $dayNumber }


[[Regimens Page, List Widget]]

regimens-list-header = Regimes
regimens-list-help   =
  | Dit is een lijst van al uw regimes.
  | Binnenkort: Regimes, en regimes klonen!
regimens-list-add    = Toevoegen


# Some Toastr messages do not have their own localized title.
# FarmBot will use the default [Success|Warning|Error] titles in those cases.
# Titles are denoted with -t- and messages are denoted with -m-
[[Toastr Messages, Success]]

success-t-default          = Succes
success-m-SAVE_DEVICE_OK   = Apparaat opgeslagen.
success-m-SAVE_SEQUENCE_OK = { LEN( $sequenceName ) ->
                               [0] Instructieset
                              *[_] "{ $sequenceName }"
                             } opgeslagen.


# Titles are denoted with -t- and messages are denoted with -m-
[[Toastr Messages, Warning]]

warning-t-default                    = Waarschuwing
warning-m-COMMIT_BULK_EDITOR_FAILURE = Kies eerst een instructieset uit de keuzelijst.
warning-t-FETCH_DEVICE_ERR           = Geen apparaat gevonden!
warning-m-FETCH_DEVICE_ERR           = U moet een apparaat aan uw account toevoegen.
warning-t-TIME_OFFSET_ERROR          = Slechte Invoer
warning-m-TIME_OFFSET_ERROR          = Het verwachte formaat van regime tijdstippen is '12:34 pm'
warning-t-UNKNOWN_MESSAGE            = Ongeldig Bericht
warning-m-UNKNOWN_MESSAGE            = FarmBot stuurde een onbekend bericht. Zie log voor details.


# Titles are denoted with -t- and messages are denoted with -m-
[[Toastr Messages, Error]]

error-t-default             = Foutmelding
error-t-COMMAND_ERR         = FarmBot heeft dat niet begrepen!
error-m-COMMAND_ERR         = { LEN( $payload ) ->
                                [0] Commando
                               *[_] { $payload } verzoek
                              } is mislukt.
error-m-DELETE_SEQUENCE_ERR = Kan instructieset niet verwijderen.
error-m-DESTROY_PLANT_ERR   = Kon plant niet verwijderen.
error-m-EXEC_SEQUENCE_OK    = Kon instructieset niet uitvoeren. Zie log voor details.
error-m-FETCH_DEVICE_ERR    = Kan apparaatgegevens niet downloaden van de server. Controleer uw netwerkverbinding.
error-m-FETCH_PLANTS_ERR    = Kon planten niet downloaden.
error-m-FETCH_SEQUENCE_NO   = Kon instructiesets niet downloaden.
error-m-LOGIN_ERR           = Authenticatie mislukt!
error-t-PIN_TOGGLE_ERR      = Fout tijdens schakelen van pin
error-m-PIN_TOGGLE_ERR      = Herlaad uw browservenster of herstart de apparatuur.
error-t-READ_STATUS_ERR     = Kan status niet uitlezen
error-m-READ_STATUS_ERR     = Heeft u uw bot geconfigureerd? Is deze online?
error-m-REGISTRATION_ERROR  = Onbekende server-fout!
error-m-SAVE_DEVICE_ERR     = Kon apparaat niet opslaan.
error-m-SAVE_DEVICE_ERR     = Fout tijdens opslaan van apparaat.
error-m-SAVE_PLANT_ERR      = Kon plant niet opslaan.
error-m-SAVE_SEQUENCE_NO    = Kon { $sequenceName } niet opslaan.{ $msg }
error-t-SETTING_TOGGLE_ERR  = Fout tijdens schakelen van instelling
error-m-SETTING_TOGGLE_ERR  = Herlaad uw browservenster of herstart de apparatuur.