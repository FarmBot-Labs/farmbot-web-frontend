# --------------------------------------------------- #
# FarmBot localization uses the Mozilla L20n project.
# Visit http://l20n.org/learn/ for more information.
# --------------------------------------------------- #
# Localization: nl-NL (Nederlands)
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
nav-logout         = Uitloggen
nav-e-stop         = Noodstop
nav-link-designer  = Ontwerper
nav-link-controls  = Besturing
nav-link-devices   = Apparaat
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
  | Use these manual
  | control buttons to move FarmBot in realtime. Press the
  | arrows for relative movements or type in new
  | coordinates and press <strong>GO</strong> for an
  | absolute movement. Tip: Press the Home button when
  | you are done so FarmBot is ready to get back to work.
  | Note: Currently all buttons except for Home work.
controls-move-e-stop = Noodstop
controls-move-amount = Verplaatsafstand (mm)
controls-move-axis-x = X-As
controls-move-axis-y = Y-As
controls-move-axis-z = Z-As
controls-move-go     = Ga


[[Controls Page, Tools Widget]]

controls-tools-header = Koppelstukken
controls-tools-help   =
  | Use these toggle           
  | switches to control FarmBot's tools and peripherals
  | in realtime. To edit and create new tools, press
  | the <strong>{ controls-tools-button-edit }</strong> button. Make sure to turn
  | things off when you're done! Coming soon: a working
  | edit button.
controls-tools-edit   = Wijzig
controls-tools-pin    = Pin { $pinId }


[[Controls Page, Tools Widget, Custom Tools]]

controls-tools-tool-vacuum_pump = Vacuümpomp
controls-tools-tool-water_valve = Waterklep
controls-tools-tool-led         = LED


[[Controls Page, Camera Widget]]

controls-camera-header = Camera
controls-camera-help   =
  | Press the <strong>{ controls-camera-url-button-edit }
  | </strong> button to add the URL of a livestream of
  | your FarmBot. Coming soon: A working edit button and
  | the ability to save your webcam URL in the backend.
controls-camera-edit   = Wijzig
controls-camera-url    = Webcam URL:


[[Sequences Page, Commands Widget]]

sequences-commands-header    = Commando's
sequences-commands-help      =
  | These commands are
  | the most basic things FarmBot can do. Combine them into
  | sequences to create more complex operations for
  | watering, planting seeds, measuring soil properties,
  | and more. Coming soon: drag and drop commands!
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
  | Use this widget to edit
  | sequences. Coming soon: drag and drop steps,
  | custom step names, sequence cloning, and inheritable
  | step properties!
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
sequences-editor-step-label-move-rel  =
  [html/placeholder]                    { sequences-commands-move-rel }
sequences-editor-step-label-pin-write =
  [html/placeholder]                    { sequences-commands-pin-write }
sequences-editor-step-label-pin-read  =
  [html/placeholder]                    { sequences-commands-pin-read }
sequences-editor-step-label-wait      =
  [html/placeholder]                    { sequences-commands-wait }
sequences-editor-step-label-message   =
  [html/placeholder]                    { sequences-commands-message }
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
  | Here is the list of
  | all of your sequences. Click one to edit. Coming soon:
  | sequence cloning and custom colors!
sequences-list-add    = Toevoegen


[[Regimens Page, Scheduler Widget]]

regimens-scheduler-header          = Planner
regimens-scheduler-help            =
  | Use this tool to schedule
  | a sequence to run on many days of your regimen.
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
  | Regimens allow FarmBot
  | to take care of a plant throughout its entire life. A
  | regimen consists of many sequences that are scheduled to run
  | based on the age of the plant. Regimens are applied to
  | plants from the farm designer and can be re-used on many
  | plants growing at the same or different times. Multiple
  | regimens can be applied to any one plant. Coming soon: Regimens!
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
  | This is a list of all
  | of your regimens. Coming soon: Regimens, and regimen cloning!
regimens-list-add    = Toevoegen