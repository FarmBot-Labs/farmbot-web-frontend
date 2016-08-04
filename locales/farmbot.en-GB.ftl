# --------------------------------------------------- #
# FarmBot localization uses the Mozilla L20n project.
# Visit http://l20n.org/learn/ for more information.
# --------------------------------------------------- #
# Localization: en-GB (English, United Kingdom)
# Localized by: Rory Aronson, https://github.com/roryaronson
#               Rick Carlino, https://github.com/RickCarlino
#               Marc Dingena, https://github.com/mdingena
# --------------------------------------------------- #


[[Captions]]

CAPTION_zero  = No
CAPTION_false = No
CAPTION_off   = No
CAPTION_one   = Yes
CAPTION_true  = Yes
CAPTION_on    = Yes
CAPTION_undef = ---


[[Navigation Bar]]

nav-sync           = Sync
nav-e-stop         = E-Stop
nav-logout         = Log Out
nav-link-designer  = Farm Designer
nav-link-controls  = Controls
nav-link-devices   = Devices
nav-link-sequences = Sequences
nav-link-regimens  = Regimens


[[Ticker Messages]]

ticker-LOGIN_REQUIRED     = Please log in
ticker-LOGIN_OK           = Logged in
ticker-LOGIN_ERR          = Bad login
ticker-FETCH_PLANTS_START = Fetching plants
ticker-FETCH_PLANTS_OK    = Done fetching plants
ticker-FETCH_PLANTS_ERR   = Error fetching plants
ticker-FETCH_SEQUENCES_OK = Done fetching sequences
ticker-READ_STATUS_OK     = Bot status OK
ticker-FETCH_DEVICE_ERR   = Can't connect to MQTT server
ticker-READ_STATUS_ERR    = Can't connect to bot
ticker-BOT_NOTIFICATION   = Message received
ticker-COMMAND_OK         = Message delivered


[[Login Page, Login Widget]]

login-header         = Login
login-email          = Email
login-password       = Password
login-password-reset = Reset password
login-submit         = Login
login-server-url     = Server URL (Advanced)


[[Login Page, Register Widget]]

register-header          = Create an Account
register-email           = Email
register-name            = Name
register-password        = Password
register-password-verify = Verify Password
register-submit          = Create Account


[[Controls Page, Move Widget]]

controls-move-header = Move
controls-move-help   =
  | Use these manual control buttons to move FarmBot
  | in realtime. Press the arrows for relative movements
  | or type in new coordinates and press <strong>{ controls-move-go }</strong> for an
  | absolute movement. Tip: Press the { controls-move-home } button when
  | you are done so FarmBot is ready to get back to work.
  | Note: Currently all buttons except for { controls-move-home } work.
controls-move-e-stop = E-Stop
controls-move-amount = Move Amount (mm)
controls-move-axis-x = X-Axis
controls-move-axis-y = Y-Axis
controls-move-axis-z = Z-Axis
controls-move-go     = Go
controls-move-home   = Home


[[Controls Page, Tools Widget]]

controls-tools-header = Tools
controls-tools-help   =
  | Use these toggle switches to control FarmBot's
  | tools and peripherals in realtime. To edit and
  | create new tools, press the <strong>{ controls-tools-edit }</strong> button. Make
  | sure to turn things off when you're done!
  | Coming soon: a working { controls-tools-edit } button.
controls-tools-edit   = Edit
controls-tools-pin    = Pin { $pinId }


[[Controls Page, Tools Widget, Custom Tools]]

controls-tools-tool-vacuum_pump = Vacuum Pump
controls-tools-tool-water_valve = Water Valve
controls-tools-tool-led         = LED


[[Controls Page, Camera Widget]]

controls-camera-header = Camera
controls-camera-help   =
  | Press the <strong>{ controls-camera-url-button-edit }</strong> button to add the URL of a livestream
  | of your FarmBot.
  | Coming soon: A working { controls-camera-url-button-edit } button and the ability
  | to save your webcam URL in the backend.
controls-camera-edit   = Edit
controls-camera-url    = Set Webcam URL:


[[Sequences Page, Commands Widget]]

sequences-commands-header    = Commands
sequences-commands-help      =
  | These commands are the most basic things FarmBot can
  | do. Combine them into sequences to create more
  | complex operations for watering, planting seeds,
  | measuring soil properties, and more.
  | Coming soon: drag and drop commands!
sequences-commands-move-abs  = Move Absolute
sequences-commands-move-rel  = Move Relative
sequences-commands-pin-write = Write Pin
sequences-commands-pin-read  = Read Pin
sequences-commands-wait      = Wait
sequences-commands-message   = Send Message
sequences-commands-if        = If Statement
sequences-commands-execute   = Execute


[[Sequences Page, Editor Widget]]

sequences-editor-header       = Sequence Editor
sequences-editor-help         =
  | Use this widget to edit sequences.
  | Coming soon: drag and drop steps, custom step names,
  | sequence cloning, and inheritable step properties!
sequences-editor-save         = Save
sequences-editor-save-dirty   = Save *
sequences-editor-test         = Test
sequences-editor-delete       = Delete
sequences-editor-name         =
  [html/placeholder]            Sequence Name
sequences-editor-landing-zone = Drag commands here


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

sequences-step-move-speed    = Speed
sequences-step-move-x        = X (mm)
sequences-step-move-y        = Y (mm)
sequences-step-move-z        = Z (mm)
sequences-step-move-offset-x = X-Offset (mm)
sequences-step-move-offset-y = Y-Offset (mm)
sequences-step-move-offset-z = Z-Offset (mm)


[[Sequences Page, Editor Widget, Step Tiles, Pins]]

sequences-step-pin-id         = Pin Number
sequences-step-pin-value      = Value
sequences-step-pin-mode       = Pin Mode
sequences-step-pin-data-label = Data Label


[[Sequences Page, Editor Widget, Step Tiles, Wait]]

sequences-step-wait-timeout = Time in milliseconds


[[Sequences Page, Editor Widget, Step Tiles, Messages]]

sequences-step-message-text = Message


[[Sequences Page, Editor Widget, Step Tiles, If-Statement]]

sequences-step-if = TBD


[[Sequences Page, Editor Widget, Step Tiles, Execute]]

sequences-step-execute-sequence             = Sequence
sequences-step-execute-sequence-placeholder = Pick a sequence (or save a new one)


[[Sequences Page, List Widget]]

sequences-list-header = Sequences
sequences-list-help   =
  | Here is the list of all of your sequences. Click one to edit.
  | Coming soon: sequence cloning and custom colors!
sequences-list-add    = Add
sequences-list-new    = New Sequence


[[Regimens Page, Scheduler Widget]]

regimens-scheduler-header          = Scheduler
regimens-scheduler-help            =
  | Use this tool to schedule a sequence to run on
  | many days of your regimen.
regimens-scheduler-add             = Add
regimens-scheduler-sequence-label  = Sequence
regimens-scheduler-sequence-select = Select Sequence
regimens-scheduler-time            = Time
regimens-scheduler-days            = Days
regimens-scheduler-week-row        = Week { $weekNumber }
regimens-scheduler-week-button     = Week


[[Regimens Page, Editor Widget]]

regimens-editor-header = Regimen Editor
regimens-editor-help =
  | Regimens allow FarmBot to take care of a plant throughout its
  | entire life. A regimen consists of many sequences that are
  | scheduled to run based on the age of the plant. Regimens are
  | applied to plants from the farm designer and can be re-used on
  | many plants growing at the same or different times. Multiple
  | regimens can be applied to any one plant.
  | Coming soon: Regimens!
regimens-editor-save       = Save
regimens-editor-save-dirty = Save *
regimens-editor-delete     = Delete
regimens-editor-name       =
  [html/placeholder]         Regimen Name
regimens-editor-empty      = Please click "{ regimens-list-add }" to start editing a regimen.
regimens-editor-day        = Day { $dayNumber }


[[Regimens Page, List Widget]]

regimens-list-header = Regimens
regimens-list-help   =
  | This is a list of all of your regimens.
  | Coming soon: Regimens, and regimen cloning!
regimens-list-add    = Add


# Some Toastr messages do not have their own localized title.
# FarmBot will use the default [Success|Warning|Error] titles in those cases.
# Titles are denoted with -t- and messages are denoted with -m-
[[Toastr Messages, Success]]

success-t-default          = Success
success-m-SAVE_DEVICE_OK   = Device saved.
success-m-SAVE_SEQUENCE_OK = Saved { LEN( $sequenceName ) ->
                               [0] sequence
                              *[_] "{ $sequenceName }"
                             }.


# Titles are denoted with -t- and messages are denoted with -m-
[[Toastr Messages, Warning]]

warning-t-default                    = Warning
warning-m-COMMIT_BULK_EDITOR_FAILURE = Select a sequence from the dropdown first.
warning-t-FETCH_DEVICE_ERR           = No device found!
warning-m-FETCH_DEVICE_ERR           = You need to add a device to your account.
warning-t-TIME_OFFSET_ERROR          = Bad Input
warning-m-TIME_OFFSET_ERROR          = Expected regimen time offset to follow format of '12:34 pm'
warning-t-UNKNOWN_MESSAGE            = Malformed Message
warning-m-UNKNOWN_MESSAGE            = FarmBot sent an unknown message. See log for details.


# Titles are denoted with -t- and messages are denoted with -m-
[[Toastr Messages, Error]]

error-t-default             = Error
error-t-COMMAND_ERR         = FarmBot Didn't Get That!
error-m-COMMAND_ERR         = { LEN( $payload ) ->
                                [0] Command
                               *[_] { $payload }
                              } request failed.
error-m-DELETE_SEQUENCE_ERR = Unable to delete sequence.
error-m-DESTROY_PLANT_ERR   = Tried to delete plant, but couldn't.
error-m-EXEC_SEQUENCE_OK    = Unable to execute sequence. See log for details.
error-m-FETCH_DEVICE_ERR    = Unable to download device data from server. Check your network connection.
error-m-FETCH_PLANTS_ERR    = Tried to download plants, but couldn't.
error-m-FETCH_SEQUENCE_NO   = Could not download sequences
error-m-LOGIN_ERR           = Authentication failed!
error-t-PIN_TOGGLE_ERR      = Error while toggling pin
error-m-PIN_TOGGLE_ERR      = Refresh browser or restart devices.
error-t-READ_STATUS_ERR     = Can't read status
error-m-READ_STATUS_ERR     = Did you configure your bot? Is it online?
error-m-REGISTRATION_ERROR  = Unknown server error!
error-m-SAVE_DEVICE_ERR     = Couldn't save device.
error-m-SAVE_DEVICE_ERR     = Error while saving device.
error-m-SAVE_PLANT_ERR      = Tried to save plant, but couldn't.
error-m-SAVE_SEQUENCE_NO    = Unable to save { $sequenceName }.{ $msg }
error-t-SETTING_TOGGLE_ERR  = Error while toggling setting
error-m-SETTING_TOGGLE_ERR  = Refresh browser or restart devices.