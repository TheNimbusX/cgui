Call:
	+--------------+-------------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	|    Field     |    Type     | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |           StructTag            | Validators | Comment |
	+--------------+-------------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	| id           | mixins.ID   | true   | false    | false    | false   | false         | true      | json:"id,omitempty"            |          0 |         |
	| employee_id  | mixins.ID   | true   | true     | true     | false   | false         | false     | json:"employee_id,omitempty"   |          0 |         |
	| customer_id  | mixins.ID   | true   | true     | true     | false   | false         | false     | json:"customer_id,omitempty"   |          0 |         |
	| schedule_id  | mixins.ID   | true   | true     | true     | false   | false         | false     | json:"schedule_id,omitempty"   |          0 |         |
	| canonical_id | mixins.ID   | false  | true     | true     | false   | false         | true      | json:"canonical_id,omitempty"  |          0 |         |
	| queue_id     | mixins.ID   | false  | true     | true     | false   | false         | true      | json:"queue_id,omitempty"      |          0 |         |
	| client_phone | string      | false  | false    | false    | true    | false         | false     | json:"clientPhone"             |          1 |         |
	|              |             |        |          |          |         |               |           | validate:"max=32"              |            |         |
	| source_phone | string      | false  | false    | false    | true    | false         | false     | json:"sourcePhone"             |          1 |         |
	|              |             |        |          |          |         |               |           | validate:"max=32"              |            |         |
	| extension    | string      | false  | false    | false    | true    | false         | false     | json:"line" validate:"max=32"  |          1 |         |
	| outgoing     | bool        | false  | false    | false    | true    | false         | false     | json:"outgoing"                |          0 |         |
	| status       | call.Status | false  | false    | false    | true    | false         | false     | json:"status"                  |          0 |         |
	| result       | string      | false  | false    | false    | true    | false         | false     | json:"result"                  |          1 |         |
	|              |             |        |          |          |         |               |           | validate:"max=32"              |            |         |
	| created      | time.Time   | false  | false    | false    | true    | false         | true      | json:"created"                 |          0 |         |
	| started      | time.Time   | false  | true     | false    | false   | false         | false     | json:"started"                 |          0 |         |
	| finished     | time.Time   | false  | true     | false    | false   | false         | false     | json:"finished"                |          0 |         |
	+--------------+-------------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	+----------+----------+---------+---------+----------+--------+----------+---------+
	|   Edge   |   Type   | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+----------+----------+---------+---------+----------+--------+----------+---------+
	| employee | Employee | true    | calls   | M2O      | true   | true     |         |
	| customer | Customer | true    | calls   | M2O      | true   | true     |         |
	| schedule | Schedule | true    | calls   | M2O      | true   | true     |         |
	+----------+----------+---------+---------+----------+--------+----------+---------+
	
Comment:
	+-------------+--------------------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+--------------------------------+
	|    Field    |        Type        | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |          StructTag           | Validators |            Comment             |
	+-------------+--------------------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+--------------------------------+
	| id          | mixins.ID          | true   | false    | false    | false   | false         | true      | json:"id,omitempty"          |          0 |                                |
	| employee_id | mixins.ID          | true   | false    | false    | false   | false         | false     | json:"employee_id,omitempty" |          0 |                                |
	| entity_id   | mixins.ID          | false  | false    | false    | false   | false         | true      | json:"entity_id,omitempty"   |          0 | Polymorphic parent entity ID   |
	| entity_type | comment.EntityType | false  | false    | false    | false   | false         | false     | json:"entity_type,omitempty" |          0 | Polymorphic parent entity type |
	| created     | int64              | false  | false    | false    | true    | false         | true      | json:"created,omitempty"     |          0 | Created timestamp              |
	| changed     | int64              | false  | false    | false    | true    | true          | false     | json:"changed,omitempty"     |          0 | Changed timestamp              |
	| type        | string             | false  | false    | false    | true    | false         | true      | json:"type,omitempty"        |          0 | Polymorphic current entity     |
	|             |                    |        |          |          |         |               |           |                              |            | type                           |
	+-------------+--------------------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+--------------------------------+
	+--------------+-------------+---------+----------+----------+--------+----------+---------+
	|     Edge     |    Type     | Inverse | BackRef  | Relation | Unique | Optional | Comment |
	+--------------+-------------+---------+----------+----------+--------+----------+---------+
	| employee     | Employee    | true    | comments | M2O      | true   | false    |         |
	| comment_body | CommentBody | false   |          | O2O      | true   | true     |         |
	| comment_tags | CommentTag  | false   |          | O2M      | false  | true     |         |
	+--------------+-------------+---------+----------+----------+--------+----------+---------+
	
CommentBody:
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	|    Field    |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |          StructTag           | Validators | Comment |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	| id          | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"          |          0 |         |
	| comment_id  | mixins.ID | true   | false    | false    | false   | false         | false     | json:"comment_id,omitempty"  |          0 |         |
	| entity_type | string    | false  | false    | false    | true    | false         | true      | json:"entity_type,omitempty" |          1 |         |
	| bundle      | string    | false  | false    | false    | true    | false         | true      | json:"bundle,omitempty"      |          1 |         |
	| language    | string    | false  | false    | false    | true    | false         | true      | json:"language,omitempty"    |          1 |         |
	| deleted     | int8      | false  | false    | false    | true    | false         | true      | json:"deleted,omitempty"     |          0 |         |
	| revision_id | int       | false  | true     | true     | false   | false         | true      | json:"revision_id,omitempty" |          0 |         |
	| delta       | int       | false  | false    | false    | true    | false         | false     | json:"delta,omitempty"       |          0 |         |
	| value       | string    | false  | true     | true     | false   | false         | false     | json:"value,omitempty"       |          0 |         |
	| format      | string    | false  | true     | true     | false   | false         | false     | json:"format,omitempty"      |          1 |         |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	+---------+---------+---------+--------------+----------+--------+----------+---------+
	|  Edge   |  Type   | Inverse |   BackRef    | Relation | Unique | Optional | Comment |
	+---------+---------+---------+--------------+----------+--------+----------+---------+
	| comment | Comment | true    | comment_body | O2O      | true   | false    |         |
	+---------+---------+---------+--------------+----------+--------+----------+---------+
	
CommentTag:
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	|    Field    |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |          StructTag           | Validators | Comment |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	| id          | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"          |          0 |         |
	| comment_id  | mixins.ID | true   | false    | false    | false   | false         | false     | json:"comment_id,omitempty"  |          0 |         |
	| term_id     | mixins.ID | true   | true     | true     | false   | false         | false     | json:"term_id,omitempty"     |          0 |         |
	| entity_type | string    | false  | false    | false    | true    | false         | true      | json:"entity_type,omitempty" |          1 |         |
	| bundle      | string    | false  | false    | false    | true    | false         | true      | json:"bundle,omitempty"      |          1 |         |
	| language    | string    | false  | false    | false    | true    | false         | true      | json:"language,omitempty"    |          1 |         |
	| deleted     | int8      | false  | false    | false    | true    | false         | true      | json:"deleted,omitempty"     |          0 |         |
	| revision_id | int       | false  | true     | true     | false   | false         | true      | json:"revision_id,omitempty" |          0 |         |
	| delta       | int       | false  | false    | false    | true    | false         | true      | json:"delta,omitempty"       |          0 |         |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	+---------+---------+---------+--------------+----------+--------+----------+---------+
	|  Edge   |  Type   | Inverse |   BackRef    | Relation | Unique | Optional | Comment |
	+---------+---------+---------+--------------+----------+--------+----------+---------+
	| comment | Comment | true    | comment_tags | M2O      | true   | false    |         |
	| term    | Term    | true    | comment_tags | M2O      | true   | true     |         |
	+---------+---------+---------+--------------+----------+--------+----------+---------+
	
Company:
	+---------------------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------------------+------------+---------+
	|           Field           |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |                 StructTag                  | Validators | Comment |
	+---------------------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------------------+------------+---------+
	| id                        | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"                        |          0 |         |
	| name                      | string    | false  | false    | false    | false   | false         | false     | json:"name,omitempty"                      |          1 |         |
	| descriptor                | string    | false  | false    | false    | true    | false         | false     | json:"descriptor,omitempty"                |          1 |         |
	| phone                     | string    | false  | false    | false    | true    | false         | false     | json:"phone,omitempty"                     |          1 |         |
	| email                     | string    | false  | false    | false    | true    | false         | false     | json:"email,omitempty"                     |          1 |         |
	| head_position             | string    | false  | false    | false    | true    | false         | false     | json:"head_position,omitempty"             |          1 |         |
	| head_name                 | string    | false  | false    | false    | true    | false         | false     | json:"head_name,omitempty"                 |          1 |         |
	| accountant_position       | string    | false  | false    | false    | true    | false         | false     | json:"accountant_position,omitempty"       |          1 |         |
	| accountant_name           | string    | false  | false    | false    | true    | false         | false     | json:"accountant_name,omitempty"           |          1 |         |
	| address_juristic          | string    | false  | false    | false    | true    | false         | false     | json:"address_juristic,omitempty"          |          1 |         |
	| address_postal            | string    | false  | false    | false    | true    | false         | false     | json:"address_postal,omitempty"            |          1 |         |
	| inn                       | string    | false  | false    | false    | true    | false         | false     | json:"inn,omitempty"                       |          1 |         |
	| kpp                       | string    | false  | false    | false    | true    | false         | false     | json:"kpp,omitempty"                       |          1 |         |
	| ogrn                      | string    | false  | false    | false    | true    | false         | false     | json:"ogrn,omitempty"                      |          1 |         |
	| okpo                      | string    | false  | false    | false    | true    | false         | false     | json:"okpo,omitempty"                      |          1 |         |
	| created                   | int64     | false  | false    | false    | false   | false         | false     | json:"created,omitempty"                   |          0 |         |
	| changed                   | int64     | false  | false    | false    | false   | false         | false     | json:"changed,omitempty"                   |          0 |         |
	| uid                       | int64     | false  | false    | false    | false   | false         | false     | json:"uid,omitempty"                       |          0 |         |
	| account_id                | int64     | false  | false    | false    | false   | false         | false     | json:"account_id,omitempty"                |          0 |         |
	| archived                  | int64     | false  | false    | false    | true    | false         | false     | json:"archived,omitempty"                  |          0 |         |
	| sale_contract_template_id | int64     | false  | false    | false    | true    | false         | false     | json:"sale_contract_template_id,omitempty" |          0 |         |
	| sale_spec_template_id     | int64     | false  | false    | false    | true    | false         | false     | json:"sale_spec_template_id,omitempty"     |          0 |         |
	+---------------------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------------------+------------+---------+
	+----------+---------+---------+---------+----------+--------+----------+---------+
	|   Edge   |  Type   | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+----------+---------+---------+---------+----------+--------+----------+---------+
	| requests | Request | false   |         | O2M      | false  | true     |         |
	+----------+---------+---------+---------+----------+--------+----------+---------+
	
Customer:
	+----------+-------------------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	|  Field   |       Type        | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |           StructTag            | Validators | Comment |
	+----------+-------------------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	| id       | mixins.ID         | true   | false    | false    | false   | false         | true      | json:"id,omitempty"            |          0 |         |
	| user_id  | mixins.ID         | true   | false    | false    | false   | false         | false     | json:"user_id,omitempty"       |          0 |         |
	| created  | int64             | false  | false    | false    | true    | false         | false     | json:"created,omitempty"       |          0 |         |
	| updated  | int64             | false  | false    | false    | true    | false         | false     | json:"updated,omitempty"       |          0 |         |
	| name     | string            | false  | false    | false    | false   | false         | false     | json:"name"                    |          2 |         |
	|          |                   |        |          |          |         |               |           | validate:"required,max=128"    |            |         |
	| category | customer.Category | false  | true     | false    | false   | false         | false     | json:"category,omitempty"      |          0 |         |
	| profile  | customer.Profile  | false  | true     | false    | false   | false         | false     | json:"profile,omitempty"       |          0 |         |
	| company  | string            | false  | false    | false    | true    | false         | false     | json:"company"                 |          1 |         |
	| avatar   | string            | false  | false    | false    | true    | false         | false     | json:"avatar"                  |          1 |         |
	| region   | string            | false  | false    | false    | true    | false         | false     | json:"region,omitempty"        |          1 |         |
	| timezone | string            | false  | false    | false    | true    | false         | false     | json:"timezone"                |          0 |         |
	| capital  | string            | false  | false    | false    | true    | false         | false     | json:"capital"                 |          1 |         |
	+----------+-------------------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	+----------------------+-------------------+---------+----------+----------+--------+----------+---------+
	|         Edge         |       Type        | Inverse | BackRef  | Relation | Unique | Optional | Comment |
	+----------------------+-------------------+---------+----------+----------+--------+----------+---------+
	| user                 | User              | true    | customer | O2O      | true   | false    |         |
	| requests             | Request           | false   |          | O2M      | false  | true     |         |
	| schedules            | Schedule          | false   |          | O2M      | false  | true     |         |
	| snablogs             | Snablog           | false   |          | O2M      | false  | true     |         |
	| calls                | Call              | false   |          | O2M      | false  | true     |         |
	| invoices             | Invoice           | false   |          | O2M      | false  | true     |         |
	| stats                | CustomerStat      | false   |          | O2O      | true   | true     |         |
	| tags                 | CustomerTag       | false   |          | M2M      | false  | true     |         |
	| groups               | CustomerGroup     | false   |          | M2M      | false  | true     |         |
	| answers              | QuizAnswer        | false   |          | O2M      | false  | true     |         |
	| phones               | Phone             | false   |          | O2M      | false  | true     |         |
	| customer_tag_links   | CustomerTagLink   | true    | customer | O2M      | false  | true     |         |
	| customer_group_links | CustomerGroupLink | true    | customer | O2M      | false  | true     |         |
	+----------------------+-------------------+---------+----------+----------+--------+----------+---------+
	
CustomerGroup:
	+-------+-----------+--------+----------+----------+---------+---------------+-----------+---------------------+------------+---------+
	| Field |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |      StructTag      | Validators | Comment |
	+-------+-----------+--------+----------+----------+---------+---------------+-----------+---------------------+------------+---------+
	| id    | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty" |          0 |         |
	+-------+-----------+--------+----------+----------+---------+---------------+-----------+---------------------+------------+---------+
	+----------------------+-------------------+---------+---------+----------+--------+----------+---------+
	|         Edge         |       Type        | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+----------------------+-------------------+---------+---------+----------+--------+----------+---------+
	| customer             | Customer          | true    | groups  | M2M      | false  | true     |         |
	| customer_group_links | CustomerGroupLink | true    | group   | O2M      | false  | true     |         |
	+----------------------+-------------------+---------+---------+----------+--------+----------+---------+
	
CustomerGroupLink:
	+----------+-----------+--------+----------+----------+---------+---------------+-----------+---------------------------+------------+---------+
	|  Field   |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |         StructTag         | Validators | Comment |
	+----------+-----------+--------+----------+----------+---------+---------------+-----------+---------------------------+------------+---------+
	| id       | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"       |          0 |         |
	| uid      | mixins.ID | false  | false    | false    | false   | false         | false     | json:"uid,omitempty"      |          0 |         |
	| group_id | mixins.ID | false  | false    | false    | false   | false         | false     | json:"group_id,omitempty" |          0 |         |
	+----------+-----------+--------+----------+----------+---------+---------------+-----------+---------------------------+------------+---------+
	+----------+---------------+---------+---------+----------+--------+----------+---------+
	|   Edge   |     Type      | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+----------+---------------+---------+---------+----------+--------+----------+---------+
	| customer | Customer      | false   |         | M2O      | true   | false    |         |
	| group    | CustomerGroup | false   |         | M2O      | true   | false    |         |
	+----------+---------------+---------+---------+----------+--------+----------+---------+
	
CustomerStat:
	+------------------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------------------+------------+---------+
	|         Field          |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |                StructTag                | Validators | Comment |
	+------------------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------------------+------------+---------+
	| id                     | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"                     |          0 |         |
	| customer_id            | mixins.ID | true   | false    | false    | false   | false         | false     | json:"customer_id,omitempty"            |          0 |         |
	| requests_count         | int       | false  | false    | false    | false   | false         | false     | json:"requests_count,omitempty"         |          0 |         |
	| orders_count           | int       | false  | false    | false    | false   | false         | false     | json:"orders_count,omitempty"           |          0 |         |
	| orders_percent         | float64   | false  | false    | false    | false   | false         | false     | json:"orders_percent,omitempty"         |          0 |         |
	| paid_total             | int64     | false  | true     | true     | false   | false         | false     | json:"paid_total,omitempty"             |          0 |         |
	| request_cost           | int64     | false  | true     | true     | false   | false         | false     | json:"request_cost,omitempty"           |          0 |         |
	| order_cost             | int64     | false  | true     | true     | false   | false         | false     | json:"order_cost,omitempty"             |          0 |         |
	| profit_total           | int64     | false  | true     | true     | false   | false         | false     | json:"profit_total,omitempty"           |          0 |         |
	| request_profit         | int64     | false  | true     | true     | false   | false         | false     | json:"request_profit,omitempty"         |          0 |         |
	| order_profit           | int64     | false  | true     | true     | false   | false         | false     | json:"order_profit,omitempty"           |          0 |         |
	| changed                | int       | false  | false    | false    | false   | false         | false     | json:"changed,omitempty"                |          0 |         |
	| quiz_progress          | float64   | false  | false    | false    | false   | false         | false     | json:"quiz_progress,omitempty"          |          0 |         |
	| quiz_progress_required | int       | false  | false    | false    | false   | false         | false     | json:"quiz_progress_required,omitempty" |          0 |         |
	| category               | int       | false  | false    | false    | false   | false         | false     | json:"category,omitempty"               |          0 |         |
	+------------------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------------------+------------+---------+
	+----------+----------+---------+---------+----------+--------+----------+---------+
	|   Edge   |   Type   | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+----------+----------+---------+---------+----------+--------+----------+---------+
	| customer | Customer | true    | stats   | O2O      | true   | false    |         |
	+----------+----------+---------+---------+----------+--------+----------+---------+
	
CustomerTag:
	+-------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	| Field |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |           StructTag            | Validators | Comment |
	+-------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	| id    | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"            |          0 |         |
	| name  | string    | true   | false    | false    | false   | false         | false     | json:"name"                    |          2 |         |
	|       |           |        |          |          |         |               |           | validate:"required,max=32"     |            |         |
	+-------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	+--------------------+-----------------+---------+---------+----------+--------+----------+---------+
	|        Edge        |      Type       | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+--------------------+-----------------+---------+---------+----------+--------+----------+---------+
	| customer           | Customer        | true    | tags    | M2M      | false  | true     |         |
	| customer_tag_links | CustomerTagLink | true    | group   | O2M      | false  | true     |         |
	+--------------------+-----------------+---------+---------+----------+--------+----------+---------+
	
CustomerTagLink:
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	|    Field    |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |          StructTag           | Validators | Comment |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	| id          | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"          |          0 |         |
	| created     | time.Time | false  | false    | false    | true    | false         | true      | json:"created,omitempty"     |          0 |         |
	| customer_id | mixins.ID | false  | false    | false    | false   | false         | false     | json:"customer_id,omitempty" |          0 |         |
	| group_id    | mixins.ID | false  | false    | false    | false   | false         | false     | json:"group_id,omitempty"    |          0 |         |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	+----------+-------------+---------+---------+----------+--------+----------+---------+
	|   Edge   |    Type     | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+----------+-------------+---------+---------+----------+--------+----------+---------+
	| customer | Customer    | false   |         | M2O      | true   | false    |         |
	| group    | CustomerTag | false   |         | M2O      | true   | false    |         |
	+----------+-------------+---------+---------+----------+--------+----------+---------+
	
Employee:
	+-----------+-------------------------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	|   Field   |          Type           | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |           StructTag            | Validators | Comment |
	+-----------+-------------------------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	| id        | mixins.ID               | true   | false    | false    | false   | false         | true      | json:"id,omitempty"            |          0 |         |
	| created   | int64                   | false  | false    | false    | true    | false         | false     | json:"created,omitempty"       |          0 |         |
	| updated   | int64                   | false  | false    | false    | true    | false         | false     | json:"updated,omitempty"       |          0 |         |
	| name      | string                  | false  | true     | false    | false   | false         | false     | json:"name,omitempty"          |          1 |         |
	| email     | string                  | false  | true     | false    | false   | false         | false     | json:"email,omitempty"         |          1 |         |
	| extension | string                  | true   | true     | false    | false   | false         | false     | json:"extension,omitempty"     |          1 |         |
	| is_active | bool                    | false  | false    | false    | true    | false         | false     | json:"isActive"                |          0 |         |
	| timezone  | int                     | false  | false    | false    | true    | false         | false     | json:"timezone"                |          0 |         |
	|           |                         |        |          |          |         |               |           | validate:"max=12"              |            |         |
	| avatar    | string                  | false  | false    | false    | true    | false         | false     | json:"avatar"                  |          1 |         |
	| settings  | values.EmployeeSettings | false  | true     | false    | false   | false         | false     | json:"settings,omitempty"      |          0 |         |
	+-----------+-------------------------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	+-----------+------------+---------+---------+----------+--------+----------+---------+
	|   Edge    |    Type    | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+-----------+------------+---------+---------+----------+--------+----------+---------+
	| schedules | Schedule   | false   |         | O2M      | false  | true     |         |
	| snablogs  | Snablog    | false   |         | O2M      | false  | true     |         |
	| requests  | Request    | false   |         | O2M      | false  | true     |         |
	| answers   | QuizAnswer | false   |         | O2M      | false  | true     |         |
	| comments  | Comment    | false   |         | O2M      | false  | true     |         |
	| calls     | Call       | false   |         | O2M      | false  | true     |         |
	+-----------+------------+---------+---------+----------+--------+----------+---------+
	
Event:
	+--------------+-----------------+--------+----------+----------+---------+---------------+-----------+---------------------------+------------+---------+
	|    Field     |      Type       | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |         StructTag         | Validators | Comment |
	+--------------+-----------------+--------+----------+----------+---------+---------------+-----------+---------------------------+------------+---------+
	| id           | mixins.ID       | true   | false    | false    | false   | false         | true      | json:"id,omitempty"       |          0 |         |
	| sequence     | int64           | true   | false    | false    | false   | false         | true      | json:"sequence,omitempty" |          0 |         |
	| payload      | json.RawMessage | false  | false    | false    | true    | false         | false     | json:"payload"            |          0 |         |
	| available_at | time.Time       | false  | false    | false    | true    | false         | false     | json:"availableAt"        |          0 |         |
	| locked_until | time.Time       | false  | true     | false    | false   | false         | false     | json:"lockedUntil"        |          0 |         |
	| attempts     | int64           | false  | false    | false    | true    | false         | false     | json:"attempts"           |          0 |         |
	| created      | time.Time       | false  | false    | false    | true    | false         | true      | json:"created,omitempty"  |          0 |         |
	| updated      | time.Time       | false  | false    | false    | true    | true          | false     | json:"updated,omitempty"  |          0 |         |
	+--------------+-----------------+--------+----------+----------+---------+---------------+-----------+---------------------------+------------+---------+
	
Invoice:
	+-----------------------+-----------+--------+----------+----------+---------+---------------+-----------+----------------------------------------+------------+--------------------------------+
	|         Field         |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |               StructTag                | Validators |            Comment             |
	+-----------------------+-----------+--------+----------+----------+---------+---------------+-----------+----------------------------------------+------------+--------------------------------+
	| id                    | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"                    |          0 |                                |
	| request_id            | mixins.ID | true   | false    | false    | false   | false         | true      | json:"request_id,omitempty"            |          0 |                                |
	| customer_id           | mixins.ID | true   | false    | false    | false   | false         | true      | json:"customer_id,omitempty"           |          0 |                                |
	| created               | int64     | false  | false    | false    | false   | false         | false     | json:"created,omitempty"               |          0 |                                |
	| invoice_number        | string    | false  | false    | false    | true    | false         | false     | json:"invoiceNumber"                   |          1 |                                |
	|                       |           |        |          |          |         |               |           | validate:"lte=255"                     |            |                                |
	| changed               | int64     | false  | false    | false    | true    | false         | false     | json:"changed,omitempty"               |          0 |                                |
	| first_payment_created | int64     | false  | false    | false    | true    | false         | false     | json:"first_payment_created,omitempty" |          0 |                                |
	| canceled              | int64     | false  | false    | false    | true    | false         | false     | json:"canceled,omitempty"              |          0 |                                |
	| exported              | int64     | false  | false    | false    | true    | false         | false     | json:"exported,omitempty"              |          0 |                                |
	| exchange_rate         | float64   | false  | false    | false    | true    | false         | false     | json:"exchange_rate,omitempty"         |          0 |                                |
	| prepaid               | float64   | false  | false    | false    | true    | false         | false     | json:"prepaid,omitempty"               |          0 | Percent (0-100) for first      |
	|                       |           |        |          |          |         |               |           |                                        |            | payment                        |
	| paid                  | float64   | false  | true     | true     | false   | false         | false     | json:"paid,omitempty"                  |          0 | Percent paid by user           |
	| paid_value            | float64   | false  | true     | true     | false   | false         | false     | json:"paid_value,omitempty"            |          0 | Amount paid by user in         |
	|                       |           |        |          |          |         |               |           |                                        |            | currency of invoice            |
	| paid_input            | float64   | false  | true     | true     | false   | false         | false     | json:"paid_input,omitempty"            |          0 | Amount paid by user in rubles  |
	| rate                  | int64     | false  | false    | false    | true    | false         | false     | json:"rate,omitempty"                  |          0 | Currency rate with 4 digits    |
	|                       |           |        |          |          |         |               |           |                                        |            | after floating point as        |
	|                       |           |        |          |          |         |               |           |                                        |            | integer, e.g. 1060844 ->       |
	|                       |           |        |          |          |         |               |           |                                        |            |                       106.0844 |
	| currency_risk         | int64     | false  | false    | false    | true    | false         | false     | json:"currency_risk,omitempty"         |          0 | Commission in percent          |
	|                       |           |        |          |          |         |               |           |                                        |            | applied to invoice as a rate   |
	|                       |           |        |          |          |         |               |           |                                        |            | fluctuation risk               |
	| currency_option       | string    | false  | false    | false    | true    | false         | false     | json:"currency_option,omitempty"       |          1 | Calculation strategies         |
	|                       |           |        |          |          |         |               |           |                                        |            | descriptors                    |
	| actuality             | string    | false  | false    | false    | true    | false         | false     | json:"actuality,omitempty"             |          1 | Human readable text of terms   |
	|                       |           |        |          |          |         |               |           |                                        |            | until invoice is available to  |
	|                       |           |        |          |          |         |               |           |                                        |            | pay                            |
	| shipping_time         | string    | false  | false    | false    | true    | false         | false     | json:"shipping_time,omitempty"         |          1 | Human readable shipping terms  |
	| company_details       | string    | false  | false    | false    | true    | false         | false     | json:"company_details,omitempty"       |          1 | Seller company banking details |
	| title                 | string    | false  | false    | false    | true    | false         | false     | json:"title,omitempty"                 |          1 | Human readable text header for |
	|                       |           |        |          |          |         |               |           |                                        |            | the invoice                    |
	+-----------------------+-----------+--------+----------+----------+---------+---------------+-----------+----------------------------------------+------------+--------------------------------+
	+------------------+----------------+---------+----------+----------+--------+----------+---------+
	|       Edge       |      Type      | Inverse | BackRef  | Relation | Unique | Optional | Comment |
	+------------------+----------------+---------+----------+----------+--------+----------+---------+
	| request          | Request        | true    | invoices | M2O      | true   | false    |         |
	| customer         | Customer       | true    | invoices | M2O      | true   | false    |         |
	| invoice_products | InvoiceProduct | false   |          | O2M      | false  | true     |         |
	| invoice_payments | InvoicePayment | false   |          | O2M      | false  | true     |         |
	+------------------+----------------+---------+----------+----------+--------+----------+---------+
	
InvoicePayment:
	+-----------------+-----------+--------+----------+----------+---------+---------------+-----------+----------------------------------+------------+--------------------------------+
	|      Field      |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |            StructTag             | Validators |            Comment             |
	+-----------------+-----------+--------+----------+----------+---------+---------------+-----------+----------------------------------+------------+--------------------------------+
	| id              | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"              |          0 |                                |
	| invoice_id      | mixins.ID | true   | false    | false    | false   | false         | true      | json:"invoice_id,omitempty"      |          0 |                                |
	| paid_input      | float64   | false  | true     | true     | false   | false         | false     | json:"paid_input,omitempty"      |          0 | Amount in rubles               |
	| exchange_rate   | float64   | false  | false    | false    | true    | false         | false     | json:"exchange_rate,omitempty"   |          0 | Exchange rate in floats        |
	| rate            | int64     | false  | false    | false    | true    | false         | false     | json:"rate,omitempty"            |          0 | Exchange rate as integer with  |
	|                 |           |        |          |          |         |               |           |                                  |            | 4 digits after the point       |
	| paid_percent    | float64   | false  | false    | false    | true    | false         | false     | json:"paid_percent,omitempty"    |          0 | Paid percent share of this     |
	|                 |           |        |          |          |         |               |           |                                  |            | payment against total invoice  |
	|                 |           |        |          |          |         |               |           |                                  |            | amount                         |
	| created         | int64     | false  | false    | false    | true    | false         | false     | json:"created,omitempty"         |          0 |                                |
	| changed         | int64     | false  | false    | false    | true    | false         | false     | json:"changed,omitempty"         |          0 |                                |
	| payment_date    | int64     | false  | false    | false    | true    | false         | false     | json:"payment_date,omitempty"    |          0 | Timestamp when buyer sent      |
	|                 |           |        |          |          |         |               |           |                                  |            | payment                        |
	| transfer_date   | int64     | false  | false    | false    | true    | false         | false     | json:"transfer_date,omitempty"   |          0 | Timestamp when payment was     |
	|                 |           |        |          |          |         |               |           |                                  |            | transferred to seller bank     |
	| transfer_number | string    | false  | false    | false    | true    | false         | false     | json:"transfer_number,omitempty" |          1 | Transaction number from the    |
	|                 |           |        |          |          |         |               |           |                                  |            | bank                           |
	+-----------------+-----------+--------+----------+----------+---------+---------------+-----------+----------------------------------+------------+--------------------------------+
	+---------+---------+---------+------------------+----------+--------+----------+---------+
	|  Edge   |  Type   | Inverse |     BackRef      | Relation | Unique | Optional | Comment |
	+---------+---------+---------+------------------+----------+--------+----------+---------+
	| invoice | Invoice | true    | invoice_payments | M2O      | true   | false    |         |
	+---------+---------+---------+------------------+----------+--------+----------+---------+
	
InvoiceProduct:
	+-------------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------------+------------+--------------------------------+
	|       Field       |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |             StructTag              | Validators |            Comment             |
	+-------------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------------+------------+--------------------------------+
	| id                | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"                |          0 |                                |
	| invoice_id        | mixins.ID | true   | false    | false    | false   | false         | true      | json:"invoice_id,omitempty"        |          0 |                                |
	| product_id        | mixins.ID | true   | false    | false    | false   | false         | true      | json:"product_id,omitempty"        |          0 |                                |
	| created           | int64     | false  | false    | false    | true    | false         | false     | json:"created,omitempty"           |          0 |                                |
	| active            | bool      | false  | true     | true     | true    | false         | false     | json:"active,omitempty"            |          0 |                                |
	| draft_id          | int64     | false  | false    | false    | false   | false         | false     | json:"draft_id,omitempty"          |          0 |                                |
	| line_num          | int       | false  | false    | false    | true    | false         | false     | json:"line_num,omitempty"          |          0 | Line number within the invoice |
	| vat               | int64     | false  | false    | false    | true    | false         | false     | json:"vat,omitempty"               |          0 | VAT value percent              |
	| currency          | string    | false  | false    | false    | true    | false         | false     | json:"currency,omitempty"          |          1 |                                |
	| unit_no_vat       | float64   | false  | false    | false    | true    | false         | false     | json:"unit_no_vat,omitempty"       |          0 | Unit price excluding VAT       |
	| line_no_vat       | float64   | false  | false    | false    | true    | false         | false     | json:"line_no_vat,omitempty"       |          0 | Line total excluding VAT       |
	| unit              | float64   | false  | false    | false    | true    | false         | false     | json:"unit,omitempty"              |          0 | Unit price including VAT       |
	| line              | float64   | false  | false    | false    | true    | false         | false     | json:"line,omitempty"              |          0 | Line total including VAT       |
	| shipping_price    | float64   | false  | false    | false    | true    | false         | false     | json:"shipping_price,omitempty"    |          0 |                                |
	| shipping_currency | string    | false  | false    | false    | true    | false         | false     | json:"shipping_currency,omitempty" |          1 |                                |
	| margin            | float64   | false  | false    | false    | true    | false         | false     | json:"margin,omitempty"            |          0 |                                |
	| qty               | float64   | false  | false    | false    | true    | false         | false     | json:"qty,omitempty"               |          0 |                                |
	| title             | string    | false  | false    | false    | true    | false         | false     | json:"title,omitempty"             |          1 |                                |
	+-------------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------------+------------+--------------------------------+
	+---------+---------+---------+------------------+----------+--------+----------+---------+
	|  Edge   |  Type   | Inverse |     BackRef      | Relation | Unique | Optional | Comment |
	+---------+---------+---------+------------------+----------+--------+----------+---------+
	| invoice | Invoice | true    | invoice_products | M2O      | true   | false    |         |
	| product | Product | true    | invoice_products | M2O      | true   | false    |         |
	+---------+---------+---------+------------------+----------+--------+----------+---------+
	
Offer:
	+--------------------+-----------+--------+----------+----------+---------+---------------+-----------+-------------------------------------+------------+---------+
	|       Field        |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |              StructTag              | Validators | Comment |
	+--------------------+-----------+--------+----------+----------+---------+---------------+-----------+-------------------------------------+------------+---------+
	| id                 | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"                 |          0 |         |
	| request_id         | mixins.ID | true   | false    | false    | false   | false         | true      | json:"request_id,omitempty"         |          0 |         |
	| partner_id         | mixins.ID | true   | false    | false    | false   | false         | true      | json:"partner_id,omitempty"         |          0 |         |
	| status_id          | int64     | false  | false    | false    | false   | false         | false     | json:"status_id,omitempty"          |          0 |         |
	| hash               | string    | false  | true     | false    | false   | false         | false     | json:"hash,omitempty"               |          0 |         |
	| created            | int64     | false  | false    | false    | true    | false         | false     | json:"created,omitempty"            |          0 |         |
	| changed            | int64     | false  | false    | false    | true    | false         | false     | json:"changed,omitempty"            |          0 |         |
	| expired            | int64     | false  | true     | false    | false   | false         | false     | json:"expired,omitempty"            |          0 |         |
	| accepted           | int64     | false  | true     | false    | false   | false         | false     | json:"accepted,omitempty"           |          0 |         |
	| complete           | int64     | false  | true     | false    | false   | false         | false     | json:"complete,omitempty"           |          0 |         |
	| changed_by_partner | int64     | false  | true     | false    | false   | false         | false     | json:"changed_by_partner,omitempty" |          0 |         |
	| partner_offer_id   | string    | false  | true     | false    | false   | false         | false     | json:"partner_offer_id,omitempty"   |          0 |         |
	| shipping_time      | string    | false  | true     | false    | false   | false         | false     | json:"shipping_time,omitempty"      |          0 |         |
	| margin             | float64   | false  | true     | false    | false   | false         | false     | json:"margin,omitempty"             |          0 |         |
	+--------------------+-----------+--------+----------+----------+---------+---------------+-----------+-------------------------------------+------------+---------+
	+------------------+-----------------+---------+---------+----------+--------+----------+---------+
	|       Edge       |      Type       | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+------------------+-----------------+---------+---------+----------+--------+----------+---------+
	| request          | Request         | true    | offers  | M2O      | true   | false    |         |
	| partner          | Partner         | true    | offers  | M2O      | true   | false    |         |
	| products         | Product         | false   |         | O2M      | false  | true     |         |
	| origin_products  | Product         | false   |         | O2M      | false  | true     |         |
	| orders           | Order           | false   |         | O2M      | false  | true     |         |
	| selling_expenses | SellingExpences | false   |         | O2M      | false  | true     |         |
	+------------------+-----------------+---------+---------+----------+--------+----------+---------+
	
Order:
	+-----------------------+-----------+--------+----------+----------+---------+---------------+-----------+----------------------------------------+------------+---------+
	|         Field         |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |               StructTag                | Validators | Comment |
	+-----------------------+-----------+--------+----------+----------+---------+---------------+-----------+----------------------------------------+------------+---------+
	| id                    | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"                    |          0 |         |
	| request_id            | mixins.ID | true   | false    | false    | false   | false         | true      | json:"request_id,omitempty"            |          0 |         |
	| partner_id            | mixins.ID | true   | false    | false    | false   | false         | true      | json:"partner_id,omitempty"            |          0 |         |
	| offer_id              | mixins.ID | true   | false    | false    | false   | false         | true      | json:"offer_id,omitempty"              |          0 |         |
	| created               | int64     | false  | false    | false    | false   | false         | false     | json:"created,omitempty"               |          0 |         |
	| changed               | int64     | false  | false    | false    | false   | false         | false     | json:"changed,omitempty"               |          0 |         |
	| post_date             | int64     | false  | false    | false    | true    | false         | false     | json:"post_date,omitempty"             |          0 |         |
	| order_group           | string    | false  | false    | false    | true    | false         | false     | json:"order_group,omitempty"           |          0 |         |
	| order_documents_id    | int64     | false  | false    | false    | true    | false         | false     | json:"order_documents_id,omitempty"    |          0 |         |
	| invoice_group         | string    | false  | false    | false    | true    | false         | false     | json:"invoice_group,omitempty"         |          0 |         |
	| prepaid               | int64     | false  | false    | false    | true    | false         | false     | json:"prepaid,omitempty"               |          0 |         |
	| invoice_requested     | int64     | false  | false    | false    | true    | false         | false     | json:"invoice_requested,omitempty"     |          0 |         |
	| status                | int64     | false  | false    | false    | true    | false         | false     | json:"status,omitempty"                |          0 |         |
	| negative_comission    | float64   | false  | false    | false    | true    | false         | false     | json:"negative_comission,omitempty"    |          0 |         |
	| paid                  | float64   | false  | true     | false    | false   | false         | false     | json:"paid,omitempty"                  |          0 |         |
	| paid_value            | float64   | false  | true     | false    | false   | false         | false     | json:"paid_value,omitempty"            |          0 |         |
	| received              | string    | false  | false    | false    | true    | false         | false     | json:"received,omitempty"              |          0 |         |
	| partner_invoice       | string    | false  | false    | false    | true    | false         | false     | json:"partner_invoice,omitempty"       |          0 |         |
	| partner_confirmed     | int64     | false  | false    | false    | true    | false         | false     | json:"partner_confirmed,omitempty"     |          0 |         |
	| agent_invoice_number  | string    | false  | false    | false    | true    | false         | false     | json:"agent_invoice_number,omitempty"  |          0 |         |
	| agent_invoice_date    | int64     | false  | false    | false    | true    | false         | false     | json:"agent_invoice_date,omitempty"    |          0 |         |
	| agent_invoice_details | int64     | false  | false    | false    | true    | false         | false     | json:"agent_invoice_details,omitempty" |          0 |         |
	| agent_invoice_reason  | string    | false  | false    | false    | true    | false         | false     | json:"agent_invoice_reason,omitempty"  |          0 |         |
	| payment_group         | int64     | false  | false    | false    | true    | false         | false     | json:"payment_group,omitempty"         |          0 |         |
	| shipping_requested    | int64     | false  | false    | false    | true    | false         | false     | json:"shipping_requested,omitempty"    |          0 |         |
	| purchase_price        | int64     | false  | false    | false    | true    | false         | false     | json:"purchase_price,omitempty"        |          0 |         |
	+-----------------------+-----------+--------+----------+----------+---------+---------------+-----------+----------------------------------------+------------+---------+
	+-----------+---------------+---------+---------+----------+--------+----------+---------+
	|   Edge    |     Type      | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+-----------+---------------+---------+---------+----------+--------+----------+---------+
	| request   | Request       | true    | orders  | M2O      | true   | false    |         |
	| partner   | Partner       | true    | orders  | M2O      | true   | false    |         |
	| offer     | Offer         | true    | orders  | M2O      | true   | false    |         |
	| products  | Product       | false   |         | O2M      | false  | true     |         |
	| shippings | OrderShipping | false   |         | O2M      | false  | true     |         |
	+-----------+---------------+---------+---------+----------+--------+----------+---------+
	
OrderShipping:
	+-------------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------------+------------+---------+
	|       Field       |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |             StructTag              | Validators | Comment |
	+-------------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------------+------------+---------+
	| id                | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"                |          0 |         |
	| order_id          | mixins.ID | true   | false    | false    | false   | false         | true      | json:"order_id,omitempty"          |          0 |         |
	| shipping_group_id | mixins.ID | true   | false    | false    | false   | false         | false     | json:"shipping_group_id,omitempty" |          0 |         |
	| created           | int64     | false  | false    | false    | true    | false         | false     | json:"created,omitempty"           |          0 |         |
	| changed           | int64     | false  | false    | false    | true    | false         | false     | json:"changed,omitempty"           |          0 |         |
	| products_ids      | string    | false  | true     | true     | false   | false         | false     | json:"products_ids,omitempty"      |          1 |         |
	| received          | int64     | false  | false    | false    | true    | false         | false     | json:"received,omitempty"          |          0 |         |
	| sent_to_client    | int64     | false  | false    | false    | true    | false         | false     | json:"sent_to_client,omitempty"    |          0 |         |
	+-------------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------------+------------+---------+
	+-------------------+----------------------+---------+-----------+----------+--------+----------+---------+
	|       Edge        |         Type         | Inverse |  BackRef  | Relation | Unique | Optional | Comment |
	+-------------------+----------------------+---------+-----------+----------+--------+----------+---------+
	| order             | Order                | true    | shippings | M2O      | true   | false    |         |
	| shipping_group    | OrderShippingGroup   | true    | shippings | M2O      | true   | false    |         |
	| products          | Product              | false   |           | M2M      | false  | true     |         |
	| shipping_products | OrderShippingProduct | true    | shipping  | O2M      | false  | true     |         |
	+-------------------+----------------------+---------+-----------+----------+--------+----------+---------+
	
OrderShippingGroup:
	+-----------------+-----------+--------+----------+----------+---------+---------------+-----------+----------------------------------+------------+---------+
	|      Field      |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |            StructTag             | Validators | Comment |
	+-----------------+-----------+--------+----------+----------+---------+---------------+-----------+----------------------------------+------------+---------+
	| id              | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"              |          0 |         |
	| partner_id      | mixins.ID | true   | true     | true     | false   | false         | false     | json:"partner_id,omitempty"      |          0 |         |
	| created         | int64     | false  | false    | false    | true    | false         | false     | json:"created,omitempty"         |          0 |         |
	| post_date       | int64     | false  | false    | false    | true    | false         | false     | json:"post_date,omitempty"       |          0 |         |
	| send_accountant | int64     | false  | false    | false    | true    | false         | false     | json:"send_accountant,omitempty" |          0 |         |
	| documents_date  | int64     | false  | false    | false    | true    | false         | false     | json:"documents_date,omitempty"  |          0 |         |
	| gtd             | string    | false  | false    | false    | true    | false         | false     | json:"gtd,omitempty"             |          1 |         |
	+-----------------+-----------+--------+----------+----------+---------+---------------+-----------+----------------------------------+------------+---------+
	+-----------+---------------+---------+-----------------+----------+--------+----------+---------+
	|   Edge    |     Type      | Inverse |     BackRef     | Relation | Unique | Optional | Comment |
	+-----------+---------------+---------+-----------------+----------+--------+----------+---------+
	| partner   | Partner       | true    | shipping_groups | M2O      | true   | true     |         |
	| shippings | OrderShipping | false   |                 | O2M      | false  | true     |         |
	+-----------+---------------+---------+-----------------+----------+--------+----------+---------+
	
OrderShippingProduct:
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	|    Field    |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |          StructTag           | Validators | Comment |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	| id          | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"          |          0 |         |
	| shipping_id | mixins.ID | false  | false    | false    | false   | false         | false     | json:"shipping_id,omitempty" |          0 |         |
	| product_id  | mixins.ID | false  | false    | false    | false   | false         | false     | json:"product_id,omitempty"  |          0 |         |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	+----------+---------------+---------+---------+----------+--------+----------+---------+
	|   Edge   |     Type      | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+----------+---------------+---------+---------+----------+--------+----------+---------+
	| shipping | OrderShipping | false   |         | M2O      | true   | false    |         |
	| product  | Product       | false   |         | M2O      | true   | false    |         |
	+----------+---------------+---------+---------+----------+--------+----------+---------+
	
Partner:
	+---------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	|     Field     |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |           StructTag            | Validators | Comment |
	+---------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	| id            | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"            |          0 |         |
	| name          | string    | false  | false    | false    | true    | false         | false     | json:"title"                   |          1 |         |
	|               |           |        |          |          |         |               |           | validate:"lte=255"             |            |         |
	| abbr          | string    | false  | false    | false    | true    | false         | false     | json:"abbr" validate:"lte=255" |          1 |         |
	| email         | string    | false  | false    | false    | true    | false         | false     | json:"mail"                    |          1 |         |
	|               |           |        |          |          |         |               |           | validate:"lte=255,email"       |            |         |
	| disabled      | int64     | false  | false    | false    | true    | false         | false     | json:"disabled"                |          0 |         |
	| country_code  | string    | false  | false    | false    | true    | false         | false     | json:"countryCode"             |          1 |         |
	|               |           |        |          |          |         |               |           | validate:"lte=32"              |            |         |
	| language_code | string    | false  | false    | false    | true    | false         | false     | json:"languageCode"            |          1 |         |
	|               |           |        |          |          |         |               |           | validate:"lte=32"              |            |         |
	+---------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	+-----------------+--------------------+---------+---------+----------+--------+----------+---------+
	|      Edge       |        Type        | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+-----------------+--------------------+---------+---------+----------+--------+----------+---------+
	| offers          | Offer              | false   |         | O2M      | false  | true     |         |
	| orders          | Order              | false   |         | O2M      | false  | true     |         |
	| shipping_groups | OrderShippingGroup | false   |         | O2M      | false  | true     |         |
	+-----------------+--------------------+---------+---------+----------+--------+----------+---------+
	
Phone:
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+--------------------------------+
	|    Field    |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |           StructTag            | Validators |            Comment             |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+--------------------------------+
	| id          | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"            |          0 |                                |
	| customer_id | mixins.ID | true   | false    | false    | false   | false         | false     | json:"customer_id,omitempty"   |          0 |                                |
	| number      | string    | false  | false    | false    | false   | false         | false     | json:"number"                  |          1 |                                |
	|             |           |        |          |          |         |               |           | validate:"required,max=32"     |            |                                |
	| ext         | string    | false  | false    | false    | true    | false         | false     | json:"ext"                     |          1 |                                |
	| is_primary  | bool      | false  | false    | false    | true    | false         | false     | json:"isPrimary"               |          0 |                                |
	| is_valid    | bool      | false  | false    | false    | true    | false         | false     | json:"isValid"                 |          0 |                                |
	| name        | string    | false  | false    | false    | true    | false         | false     | json:"name" validate:"max=128" |          1 | Phone number name, e.g.        |
	|             |           |        |          |          |         |               |           |                                |            | contact person name, position, |
	|             |           |        |          |          |         |               |           |                                |            | etc.                           |
	| dept        | string    | false  | false    | false    | true    | false         | false     | json:"dept" validate:"max=32"  |          1 |                                |
	| raw_input   | string    | false  | false    | false    | true    | false         | false     | json:"raw_input,omitempty"     |          1 |                                |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+--------------------------------+
	+----------+----------+---------+---------+----------+--------+----------+---------+
	|   Edge   |   Type   | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+----------+----------+---------+---------+----------+--------+----------+---------+
	| customer | Customer | true    | phones  | M2O      | true   | false    |         |
	+----------+----------+---------+---------+----------+--------+----------+---------+
	
Product:
	+---------------------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------------------+------------+--------------+
	|           Field           |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |                 StructTag                  | Validators |   Comment    |
	+---------------------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------------------+------------+--------------+
	| id                        | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"                        |          0 |              |
	| request_id                | mixins.ID | true   | true     | true     | false   | false         | false     | json:"request_id,omitempty"                |          0 |              |
	| offer_id                  | mixins.ID | true   | true     | true     | false   | false         | false     | json:"offer_id,omitempty"                  |          0 |              |
	| order_id                  | mixins.ID | true   | true     | true     | false   | false         | false     | json:"order_id,omitempty"                  |          0 |              |
	| origin_offer_id           | mixins.ID | true   | true     | true     | false   | false         | false     | json:"origin_offer_id,omitempty"           |          0 |              |
	| brand                     | mixins.ID | true   | true     | true     | false   | false         | false     | json:"brand,omitempty"                     |          0 |              |
	| category                  | mixins.ID | true   | true     | true     | false   | false         | false     | json:"category,omitempty"                  |          0 |              |
	| changed                   | int64     | false  | false    | false    | false   | false         | false     | json:"changed,omitempty"                   |          0 |              |
	| ref_claim_id              | int64     | false  | true     | true     | false   | false         | false     | json:"ref_claim_id,omitempty"              |          0 |              |
	| request_product_id        | int64     | false  | true     | true     | false   | false         | false     | json:"request_product_id,omitempty"        |          0 |              |
	| qty                       | float64   | false  | false    | false    | false   | false         | false     | json:"qty,omitempty"                       |          0 |              |
	| qty_units                 | string    | false  | false    | false    | true    | false         | false     | json:"qty_units,omitempty"                 |          1 |              |
	| sku                       | string    | false  | false    | false    | true    | false         | false     | json:"sku,omitempty"                       |          1 |              |
	| model                     | string    | false  | false    | false    | true    | false         | false     | json:"model,omitempty"                     |          1 |              |
	| shipping_time             | string    | false  | true     | false    | true    | false         | false     | json:"shipping_time,omitempty"             |          1 |              |
	| shipping_min              | int64     | false  | true     | false    | true    | false         | false     | json:"shipping_min,omitempty"              |          1 |              |
	| shipping_max              | int64     | false  | true     | false    | true    | false         | false     | json:"shipping_max,omitempty"              |          1 |              |
	| weight                    | float64   | false  | true     | false    | true    | false         | false     | json:"weight,omitempty"                    |          0 | Weight in kg |
	| status                    | string    | false  | true     | false    | true    | false         | false     | json:"status,omitempty"                    |          1 |              |
	| disabled                  | bool      | false  | true     | false    | true    | false         | false     | json:"disabled,omitempty"                  |          0 |              |
	| company_margin            | float64   | false  | true     | false    | true    | false         | false     | json:"company_margin,omitempty"            |          0 |              |
	| has_price_cache           | bool      | false  | false    | false    | true    | false         | false     | json:"has_price_cache,omitempty"           |          0 |              |
	| seller_agent_id           | int64     | false  | true     | false    | false   | false         | false     | json:"seller_agent_id,omitempty"           |          0 |              |
	| supplier_unit_price_euro  | float64   | false  | true     | false    | true    | false         | false     | json:"supplier_unit_price_euro,omitempty"  |          0 |              |
	| supplier_unit_price       | float64   | false  | true     | false    | true    | false         | false     | json:"supplier_unit_price,omitempty"       |          0 |              |
	| shipping_price_total_euro | float64   | false  | true     | false    | true    | false         | false     | json:"shipping_price_total_euro,omitempty" |          0 |              |
	| supplier_currency         | string    | false  | true     | false    | true    | false         | false     | json:"supplier_currency,omitempty"         |          1 |              |
	+---------------------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------------------+------------+--------------+
	+-------------------+----------------------+---------+--------------------+----------+--------+----------+---------+
	|       Edge        |         Type         | Inverse |      BackRef       | Relation | Unique | Optional | Comment |
	+-------------------+----------------------+---------+--------------------+----------+--------+----------+---------+
	| request           | Request              | true    | products           | M2O      | true   | true     |         |
	| offer             | Offer                | true    | products           | M2O      | true   | true     |         |
	| order             | Order                | true    | products           | M2O      | true   | true     |         |
	| origin_offer      | Offer                | true    | origin_products    | M2O      | true   | true     |         |
	| brandTerm         | Term                 | true    | brands             | M2O      | true   | true     |         |
	| categoryTerm      | Term                 | true    | categories         | M2O      | true   | true     |         |
	| invoice_products  | InvoiceProduct       | false   |                    | O2M      | false  | true     |         |
	| order_shippings   | OrderShipping        | true    | products           | M2M      | false  | true     |         |
	| upds              | Upd                  | true    | products           | M2M      | false  | true     |         |
	| request_archive   | Request              | true    | products_requested | M2M      | false  | true     |         |
	| shipping_products | OrderShippingProduct | true    | product            | O2M      | false  | true     |         |
	| upd_products      | UpdProduct           | true    | product            | O2M      | false  | true     |         |
	| products_archive  | ProductsArchive      | true    | product            | O2M      | false  | true     |         |
	+-------------------+----------------------+---------+--------------------+----------+--------+----------+---------+
	
ProductsArchive:
	+----------------------------------+-----------+--------+----------+----------+---------+---------------+-----------+---------------------------------------------------+------------+---------+
	|              Field               |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |                     StructTag                     | Validators | Comment |
	+----------------------------------+-----------+--------+----------+----------+---------+---------------+-----------+---------------------------------------------------+------------+---------+
	| id                               | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"                               |          0 |         |
	| entity_id                        | mixins.ID | false  | false    | false    | false   | false         | false     | json:"entity_id,omitempty"                        |          0 |         |
	| field_products_archive_target_id | mixins.ID | false  | false    | false    | false   | false         | false     | json:"field_products_archive_target_id,omitempty" |          0 |         |
	| entity_type                      | string    | false  | false    | false    | true    | false         | true      | json:"entity_type,omitempty"                      |          1 |         |
	| bundle                           | string    | false  | false    | false    | true    | false         | true      | json:"bundle,omitempty"                           |          1 |         |
	| language                         | string    | false  | false    | false    | true    | false         | true      | json:"language,omitempty"                         |          1 |         |
	| deleted                          | int8      | false  | false    | false    | true    | false         | true      | json:"deleted,omitempty"                          |          0 |         |
	| revision_id                      | int       | false  | true     | true     | false   | false         | true      | json:"revision_id,omitempty"                      |          0 |         |
	| delta                            | int       | false  | false    | false    | true    | false         | true      | json:"delta,omitempty"                            |          0 |         |
	+----------------------------------+-----------+--------+----------+----------+---------+---------------+-----------+---------------------------------------------------+------------+---------+
	+---------+---------+---------+---------+----------+--------+----------+---------+
	|  Edge   |  Type   | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+---------+---------+---------+---------+----------+--------+----------+---------+
	| request | Request | false   |         | M2O      | true   | false    |         |
	| product | Product | false   |         | M2O      | true   | false    |         |
	+---------+---------+---------+---------+----------+--------+----------+---------+
	
Quiz:
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	|    Field    |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |          StructTag           | Validators | Comment |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	| id          | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"          |          0 |         |
	| created     | time.Time | false  | false    | false    | true    | false         | true      | json:"created,omitempty"     |          0 |         |
	| updated     | time.Time | false  | false    | false    | true    | true          | false     | json:"updated,omitempty"     |          0 |         |
	| name        | string    | false  | false    | false    | true    | false         | false     | json:"name,omitempty"        |          1 |         |
	| description | string    | false  | true     | false    | false   | false         | false     | json:"description,omitempty" |          1 |         |
	| is_enabled  | bool      | false  | false    | false    | true    | false         | false     | json:"isEnabled,omitempty"   |          0 |         |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	+-----------+--------------+---------+---------+----------+--------+----------+---------+
	|   Edge    |     Type     | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+-----------+--------------+---------+---------+----------+--------+----------+---------+
	| questions | QuizQuestion | false   |         | O2M      | false  | true     |         |
	| tags      | QuizTag      | true    | quizzes | M2M      | false  | true     |         |
	+-----------+--------------+---------+---------+----------+--------+----------+---------+
	
QuizAnswer:
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	|    Field    |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |          StructTag           | Validators | Comment |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	| id          | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"          |          0 |         |
	| created     | time.Time | false  | false    | false    | true    | false         | true      | json:"created,omitempty"     |          0 |         |
	| updated     | time.Time | false  | false    | false    | true    | true          | false     | json:"updated,omitempty"     |          0 |         |
	| customer_id | mixins.ID | true   | false    | false    | false   | false         | false     | json:"customer_id,omitempty" |          0 |         |
	| employee_id | mixins.ID | true   | false    | false    | false   | false         | false     | json:"employee_id,omitempty" |          0 |         |
	| question_id | mixins.ID | true   | false    | false    | false   | false         | false     | json:"question_id,omitempty" |          0 |         |
	| variant_id  | mixins.ID | true   | true     | true     | false   | false         | false     | json:"variant_id,omitempty"  |          0 |         |
	| comment     | string    | false  | true     | false    | true    | false         | false     | json:"comment,omitempty"     |          1 |         |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	+----------+--------------+---------+---------+----------+--------+----------+---------+
	|   Edge   |     Type     | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+----------+--------------+---------+---------+----------+--------+----------+---------+
	| customer | Customer     | true    | answers | M2O      | true   | false    |         |
	| employee | Employee     | true    | answers | M2O      | true   | false    |         |
	| question | QuizQuestion | true    | answers | M2O      | true   | false    |         |
	| variant  | QuizVariant  | true    | answers | M2O      | true   | true     |         |
	+----------+--------------+---------+---------+----------+--------+----------+---------+
	
QuizQuestion:
	+-------------+---------------------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	|    Field    |        Type         | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |          StructTag           | Validators | Comment |
	+-------------+---------------------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	| id          | mixins.ID           | true   | false    | false    | false   | false         | true      | json:"id,omitempty"          |          0 |         |
	| created     | time.Time           | false  | false    | false    | true    | false         | true      | json:"created,omitempty"     |          0 |         |
	| updated     | time.Time           | false  | false    | false    | true    | true          | false     | json:"updated,omitempty"     |          0 |         |
	| quiz_id     | mixins.ID           | true   | true     | true     | false   | false         | false     | json:"quiz_id,omitempty"     |          0 |         |
	| name        | string              | false  | false    | false    | false   | false         | false     | json:"name,omitempty"        |          2 |         |
	| description | string              | false  | false    | false    | true    | false         | false     | json:"description,omitempty" |          1 |         |
	| data        | values.QuestionNode | false  | true     | false    | false   | false         | false     | json:"data,omitempty"        |          0 |         |
	+-------------+---------------------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	+-------------------+-------------+---------+-----------+----------+--------+----------+---------+
	|       Edge        |    Type     | Inverse |  BackRef  | Relation | Unique | Optional | Comment |
	+-------------------+-------------+---------+-----------+----------+--------+----------+---------+
	| quiz              | Quiz        | true    | questions | M2O      | true   | true     |         |
	| variants          | QuizVariant | false   |           | O2M      | false  | true     |         |
	| answers           | QuizAnswer  | false   |           | O2M      | false  | true     |         |
	| previous_variants | QuizVariant | false   |           | O2M      | false  | true     |         |
	+-------------------+-------------+---------+-----------+----------+--------+----------+---------+
	
QuizTag:
	+-------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	| Field |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |           StructTag            | Validators | Comment |
	+-------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	| id    | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"            |          0 |         |
	| name  | string    | true   | false    | false    | false   | false         | false     | json:"name"                    |          2 |         |
	|       |           |        |          |          |         |               |           | validate:"required,max=32"     |            |         |
	+-------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	+---------+------+---------+---------+----------+--------+----------+---------+
	|  Edge   | Type | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+---------+------+---------+---------+----------+--------+----------+---------+
	| quizzes | Quiz | false   |         | M2M      | false  | true     |         |
	+---------+------+---------+---------+----------+--------+----------+---------+
	
QuizVariant:
	+------------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------------+------------+---------+
	|      Field       |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |             StructTag             | Validators | Comment |
	+------------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------------+------------+---------+
	| id               | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"               |          0 |         |
	| created          | time.Time | false  | false    | false    | true    | false         | true      | json:"created,omitempty"          |          0 |         |
	| updated          | time.Time | false  | false    | false    | true    | true          | false     | json:"updated,omitempty"          |          0 |         |
	| question_id      | mixins.ID | true   | false    | false    | false   | false         | false     | json:"question_id,omitempty"      |          0 |         |
	| next_question_id | mixins.ID | true   | true     | true     | false   | false         | false     | json:"next_question_id,omitempty" |          0 |         |
	| name             | string    | false  | false    | false    | false   | false         | false     | json:"name,omitempty"             |          2 |         |
	+------------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------------+------------+---------+
	+---------------+--------------+---------+-------------------+----------+--------+----------+---------+
	|     Edge      |     Type     | Inverse |      BackRef      | Relation | Unique | Optional | Comment |
	+---------------+--------------+---------+-------------------+----------+--------+----------+---------+
	| question      | QuizQuestion | true    | variants          | M2O      | true   | false    |         |
	| next_question | QuizQuestion | true    | previous_variants | M2O      | true   | true     |         |
	| answers       | QuizAnswer   | false   |                   | O2M      | false  | true     |         |
	+---------------+--------------+---------+-------------------+----------+--------+----------+---------+
	
Request:
	+------------------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------------------+------------+---------+
	|         Field          |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |                StructTag                | Validators | Comment |
	+------------------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------------------+------------+---------+
	| id                     | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"                     |          0 |         |
	| customer_id            | mixins.ID | true   | false    | false    | false   | false         | false     | json:"customer_id,omitempty"            |          0 |         |
	| manager_id             | mixins.ID | true   | false    | false    | false   | false         | false     | json:"manager_id,omitempty"             |          0 |         |
	| status_id              | mixins.ID | true   | true     | true     | false   | false         | false     | json:"status_id,omitempty"              |          0 |         |
	| lead_source_id         | mixins.ID | true   | true     | true     | false   | false         | false     | json:"lead_source_id,omitempty"         |          0 |         |
	| company_id             | mixins.ID | true   | true     | true     | false   | false         | false     | json:"company_id,omitempty"             |          0 |         |
	| created                | int64     | false  | false    | false    | false   | false         | false     | json:"created,omitempty"                |          0 |         |
	| changed                | int64     | false  | false    | false    | false   | false         | false     | json:"changed,omitempty"                |          0 |         |
	| contract_number        | string    | false  | false    | false    | false   | false         | false     | json:"contract_number,omitempty"        |          0 |         |
	| contract_date          | int64     | false  | false    | false    | false   | false         | false     | json:"contract_date,omitempty"          |          0 |         |
	| previous_status        | string    | false  | false    | false    | false   | false         | false     | json:"previous_status,omitempty"        |          0 |         |
	| exclude_partners       | string    | false  | false    | false    | false   | false         | false     | json:"exclude_partners,omitempty"       |          0 |         |
	| company_account_id     | int64     | false  | false    | false    | false   | false         | false     | json:"company_account_id,omitempty"     |          0 |         |
	| contract_spec_number   | string    | false  | false    | false    | false   | false         | false     | json:"contract_spec_number,omitempty"   |          0 |         |
	| contract_spec_date     | int64     | false  | false    | false    | false   | false         | false     | json:"contract_spec_date,omitempty"     |          0 |         |
	| customer_desired_price | int64     | false  | false    | false    | false   | false         | false     | json:"customer_desired_price,omitempty" |          0 |         |
	| offers_requested_at    | int64     | false  | false    | false    | false   | false         | false     | json:"offers_requested_at,omitempty"    |          0 |         |
	+------------------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------------------+------------+---------+
	+--------------------+------------------------+---------+----------+----------+--------+----------+---------+
	|        Edge        |          Type          | Inverse | BackRef  | Relation | Unique | Optional | Comment |
	+--------------------+------------------------+---------+----------+----------+--------+----------+---------+
	| customer           | Customer               | true    | requests | M2O      | true   | false    |         |
	| manager            | Employee               | true    | requests | M2O      | true   | false    |         |
	| status             | RequestStatus          | true    | requests | M2O      | true   | true     |         |
	| lead_source        | RequestSource          | true    | requests | M2O      | true   | true     |         |
	| company            | Company                | true    | requests | M2O      | true   | true     |         |
	| customer_account   | RequestCustomerAccount | false   |          | O2O      | true   | true     |         |
	| schedules          | Schedule               | false   |          | O2M      | false  | true     |         |
	| snablogs           | Snablog                | false   |          | O2M      | false  | true     |         |
	| products           | Product                | false   |          | O2M      | false  | true     |         |
	| products_requested | Product                | false   |          | M2M      | false  | true     |         |
	| offers             | Offer                  | false   |          | O2M      | false  | true     |         |
	| orders             | Order                  | false   |          | O2M      | false  | true     |         |
	| invoices           | Invoice                | false   |          | O2M      | false  | true     |         |
	| cancel_logs        | RequestCancelLog       | false   |          | O2M      | false  | true     |         |
	| upds               | Upd                    | true    | requests | M2M      | false  | true     |         |
	| products_archive   | ProductsArchive        | true    | request  | O2M      | false  | true     |         |
	| upd_requests       | UpdRequest             | true    | request  | O2M      | false  | true     |         |
	+--------------------+------------------------+---------+----------+----------+--------+----------+---------+
	
RequestCancelLog:
	+------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	|   Field    |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |           StructTag            | Validators | Comment |
	+------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	| id         | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"            |          0 |         |
	| request_id | mixins.ID | true   | false    | false    | false   | false         | true      | json:"request_id,omitempty"    |          0 |         |
	| reason_id  | mixins.ID | true   | false    | false    | false   | false         | true      | json:"reason_id,omitempty"     |          0 |         |
	| text       | string    | false  | false    | false    | true    | false         | false     | json:"text" validate:"lte=255" |          1 |         |
	+------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	+---------+---------------------+---------+-------------+----------+--------+----------+---------+
	|  Edge   |        Type         | Inverse |   BackRef   | Relation | Unique | Optional | Comment |
	+---------+---------------------+---------+-------------+----------+--------+----------+---------+
	| request | Request             | true    | cancel_logs | M2O      | true   | false    |         |
	| reason  | RequestCancelReason | true    | cancel_logs | M2O      | true   | false    |         |
	+---------+---------------------+---------+-------------+----------+--------+----------+---------+
	
RequestCancelReason:
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	|    Field    |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |           StructTag            | Validators | Comment |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	| id          | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"            |          0 |         |
	| name        | string    | false  | false    | false    | true    | false         | false     | json:"name"                    |          2 |         |
	|             |           |        |          |          |         |               |           | validate:"required,lte=255"    |            |         |
	| description | string    | false  | false    | false    | true    | false         | false     | json:"description"             |          1 |         |
	|             |           |        |          |          |         |               |           | validate:"lte=255"             |            |         |
	| descriptor  | string    | false  | false    | false    | true    | false         | false     | json:"descriptor"              |          1 |         |
	|             |           |        |          |          |         |               |           | validate:"lte=255"             |            |         |
	| private     | int64     | false  | false    | false    | true    | false         | false     | json:"private"                 |          0 |         |
	| archived    | int64     | false  | false    | false    | true    | false         | false     | json:"archived"                |          0 |         |
	| weight      | int64     | false  | false    | false    | true    | false         | false     | json:"weight"                  |          0 |         |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	+-------------+------------------+---------+---------+----------+--------+----------+---------+
	|    Edge     |       Type       | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+-------------+------------------+---------+---------+----------+--------+----------+---------+
	| cancel_logs | RequestCancelLog | false   |         | O2M      | false  | true     |         |
	+-------------+------------------+---------+---------+----------+--------+----------+---------+
	
RequestCustomerAccount:
	+--------------------------+-----------+--------+----------+----------+---------+---------------+-----------+-------------------------------------------+------------+---------+
	|          Field           |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |                 StructTag                 | Validators | Comment |
	+--------------------------+-----------+--------+----------+----------+---------+---------------+-----------+-------------------------------------------+------------+---------+
	| id                       | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"                       |          0 |         |
	| request_id               | mixins.ID | true   | false    | false    | false   | false         | true      | json:"request_id,omitempty"               |          0 |         |
	| okpo                     | string    | false  | false    | false    | true    | false         | false     | json:"okpo,omitempty"                     |          1 |         |
	| buyer                    | string    | false  | false    | false    | true    | false         | false     | json:"buyer,omitempty"                    |          1 |         |
	| inn                      | string    | false  | false    | false    | true    | false         | false     | json:"inn,omitempty"                      |          1 |         |
	| kpp                      | string    | false  | false    | false    | true    | false         | false     | json:"kpp,omitempty"                      |          1 |         |
	| ogrn                     | string    | false  | false    | false    | true    | false         | false     | json:"ogrn,omitempty"                     |          1 |         |
	| rs                       | string    | false  | false    | false    | true    | false         | false     | json:"rs,omitempty"                       |          1 |         |
	| ks                       | string    | false  | false    | false    | true    | false         | false     | json:"ks,omitempty"                       |          1 |         |
	| bik                      | string    | false  | false    | false    | true    | false         | false     | json:"bik,omitempty"                      |          1 |         |
	| formal_address           | string    | false  | false    | false    | true    | false         | false     | json:"formal_address,omitempty"           |          1 |         |
	| phone                    | string    | false  | false    | false    | true    | false         | false     | json:"phone,omitempty"                    |          1 |         |
	| postal_address           | string    | false  | false    | false    | true    | false         | false     | json:"postal_address,omitempty"           |          1 |         |
	| invoice_prepaid_required | int64     | false  | false    | false    | true    | false         | false     | json:"invoice_prepaid_required,omitempty" |          0 |         |
	| shipping_address         | string    | false  | false    | false    | true    | false         | false     | json:"shipping_address,omitempty"         |          1 |         |
	| no_contract_required     | int64     | false  | false    | false    | true    | false         | false     | json:"no_contract_required,omitempty"     |          0 |         |
	| customer_name            | string    | false  | false    | false    | true    | false         | false     | json:"customer_name,omitempty"            |          1 |         |
	| customer_position        | string    | false  | false    | false    | true    | false         | false     | json:"customer_position,omitempty"        |          1 |         |
	| bank                     | string    | false  | false    | false    | true    | false         | false     | json:"bank,omitempty"                     |          1 |         |
	| actual_address           | string    | false  | false    | false    | true    | false         | false     | json:"actual_address,omitempty"           |          1 |         |
	+--------------------------+-----------+--------+----------+----------+---------+---------------+-----------+-------------------------------------------+------------+---------+
	+---------+---------+---------+------------------+----------+--------+----------+---------+
	|  Edge   |  Type   | Inverse |     BackRef      | Relation | Unique | Optional | Comment |
	+---------+---------+---------+------------------+----------+--------+----------+---------+
	| request | Request | true    | customer_account | O2O      | true   | false    |         |
	+---------+---------+---------+------------------+----------+--------+----------+---------+
	
RequestFlagsHistory:
	+-------+-----------+--------+----------+----------+---------+---------------+-----------+---------------------+------------+---------+
	| Field |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |      StructTag      | Validators | Comment |
	+-------+-----------+--------+----------+----------+---------+---------------+-----------+---------------------+------------+---------+
	| id    | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty" |          0 |         |
	+-------+-----------+--------+----------+----------+---------+---------------+-----------+---------------------+------------+---------+
	
RequestLog:
	+------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------+------------+---------+
	|   Field    |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |          StructTag          | Validators | Comment |
	+------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------+------------+---------+
	| id         | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"         |          0 |         |
	| request_id | mixins.ID | false  | false    | false    | false   | false         | true      | json:"request_id,omitempty" |          0 |         |
	| event_type | string    | false  | false    | false    | true    | false         | false     | json:"eventType"            |          1 |         |
	| created    | int64     | false  | false    | false    | true    | false         | false     | json:"created"              |          0 |         |
	| changed    | int64     | false  | false    | false    | true    | false         | false     | json:"changed,omitempty"    |          0 |         |
	| delay      | int64     | false  | false    | false    | true    | false         | false     | json:"delay,omitempty"      |          0 |         |
	| activated  | int64     | false  | false    | false    | true    | false         | false     | json:"activated,omitempty"  |          0 |         |
	| context_id | int64     | false  | false    | false    | true    | false         | false     | json:"context_id,omitempty" |          0 |         |
	+------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------+------------+---------+
	
RequestSource:
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	|    Field    |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |          StructTag           | Validators | Comment |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	| id          | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"          |          0 |         |
	| name        | string    | false  | false    | false    | true    | false         | false     | json:"name,omitempty"        |          1 |         |
	| domain_name | string    | false  | true     | false    | true    | false         | false     | json:"domain_name,omitempty" |          1 |         |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	+----------+---------+---------+---------+----------+--------+----------+---------+
	|   Edge   |  Type   | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+----------+---------+---------+---------+----------+--------+----------+---------+
	| requests | Request | false   |         | O2M      | false  | true     |         |
	+----------+---------+---------+---------+----------+--------+----------+---------+
	
RequestStatus:
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	|    Field    |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |          StructTag           | Validators | Comment |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	| id          | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"          |          0 |         |
	| name        | string    | false  | true     | false    | true    | false         | false     | json:"name,omitempty"        |          1 |         |
	| description | string    | false  | true     | false    | true    | false         | false     | json:"description,omitempty" |          1 |         |
	+-------------+-----------+--------+----------+----------+---------+---------------+-----------+------------------------------+------------+---------+
	+----------+---------+---------+---------+----------+--------+----------+---------+
	|   Edge   |  Type   | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+----------+---------+---------+---------+----------+--------+----------+---------+
	| requests | Request | false   |         | O2M      | false  | true     |         |
	+----------+---------+---------+---------+----------+--------+----------+---------+
	
RequestView:
	+------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------+------------+---------+
	|   Field    |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |          StructTag          | Validators | Comment |
	+------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------+------------+---------+
	| id         | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"         |          0 |         |
	| request_id | mixins.ID | false  | false    | false    | false   | false         | true      | json:"request_id,omitempty" |          0 |         |
	| event_type | string    | false  | false    | false    | true    | false         | false     | json:"eventType"            |          1 |         |
	| created    | int64     | false  | false    | false    | true    | false         | false     | json:"created"              |          0 |         |
	| changed    | int64     | false  | false    | false    | true    | false         | false     | json:"changed,omitempty"    |          0 |         |
	| delay      | int64     | false  | false    | false    | true    | false         | false     | json:"delay,omitempty"      |          0 |         |
	| activated  | int64     | false  | false    | false    | true    | false         | false     | json:"activated,omitempty"  |          0 |         |
	| context_id | int64     | false  | false    | false    | true    | false         | false     | json:"context_id,omitempty" |          0 |         |
	+------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------+------------+---------+
	
Schedule:
	+--------------+-----------+--------+----------+----------+---------+---------------+-----------+-------------------------------+------------+---------+
	|    Field     |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |           StructTag           | Validators | Comment |
	+--------------+-----------+--------+----------+----------+---------+---------------+-----------+-------------------------------+------------+---------+
	| id           | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"           |          0 |         |
	| request_id   | mixins.ID | true   | false    | false    | false   | false         | true      | json:"request_id,omitempty"   |          0 |         |
	| employee_id  | mixins.ID | true   | false    | false    | false   | false         | false     | json:"employee_id,omitempty"  |          0 |         |
	| customer_id  | mixins.ID | true   | false    | false    | false   | false         | true      | json:"customer_id,omitempty"  |          0 |         |
	| tag_id       | mixins.ID | true   | true     | true     | false   | false         | true      | json:"tag_id,omitempty"       |          0 |         |
	| scheduled_at | time.Time | false  | false    | false    | false   | false         | false     | json:"scheduled_at,omitempty" |          0 |         |
	| completed_at | time.Time | false  | true     | false    | false   | false         | false     | json:"completed_at,omitempty" |          0 |         |
	+--------------+-----------+--------+----------+----------+---------+---------------+-----------+-------------------------------+------------+---------+
	+----------+----------+---------+-----------+----------+--------+----------+---------+
	|   Edge   |   Type   | Inverse |  BackRef  | Relation | Unique | Optional | Comment |
	+----------+----------+---------+-----------+----------+--------+----------+---------+
	| request  | Request  | true    | schedules | M2O      | true   | false    |         |
	| employee | Employee | true    | schedules | M2O      | true   | false    |         |
	| customer | Customer | true    | schedules | M2O      | true   | false    |         |
	| tag      | Tag      | true    | schedules | M2O      | true   | true     |         |
	| calls    | Call     | false   |           | O2M      | false  | true     |         |
	+----------+----------+---------+-----------+----------+--------+----------+---------+
	
ScheduleEvent:
	+--------------+-------------------------+--------+----------+----------+---------+---------------+-----------+-------------------------------+------------+---------+
	|    Field     |          Type           | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |           StructTag           | Validators | Comment |
	+--------------+-------------------------+--------+----------+----------+---------+---------------+-----------+-------------------------------+------------+---------+
	| id           | mixins.ID               | true   | false    | false    | false   | false         | true      | json:"id,omitempty"           |          0 |         |
	| version_at   | time.Time               | false  | false    | false    | true    | false         | false     | json:"version_at,omitempty"   |          0 |         |
	| operation    | scheduleevent.Operation | false  | false    | false    | true    | false         | false     | json:"operation,omitempty"    |          0 |         |
	| created      | int64                   | false  | false    | false    | true    | false         | false     | json:"created,omitempty"      |          0 |         |
	| event        | string                  | false  | false    | false    | true    | false         | false     | json:"event,omitempty"        |          1 |         |
	| activated    | int64                   | false  | false    | false    | true    | false         | false     | json:"activated,omitempty"    |          0 |         |
	| context_id   | int64                   | false  | false    | false    | true    | false         | false     | json:"context_id,omitempty"   |          0 |         |
	| request_id   | int64                   | false  | true     | true     | false   | false         | false     | json:"request_id,omitempty"   |          0 |         |
	| employee_id  | int64                   | false  | true     | true     | false   | false         | false     | json:"employee_id,omitempty"  |          0 |         |
	| customer_id  | int64                   | false  | true     | true     | false   | false         | false     | json:"customer_id,omitempty"  |          0 |         |
	| author_id    | int64                   | false  | true     | true     | false   | false         | false     | json:"author_id,omitempty"    |          0 |         |
	| scheduled_at | time.Time               | false  | true     | true     | false   | false         | false     | json:"scheduled_at,omitempty" |          0 |         |
	| completed_at | time.Time               | false  | true     | true     | false   | false         | false     | json:"completed_at,omitempty" |          0 |         |
	| note         | string                  | false  | false    | false    | true    | false         | false     | json:"note,omitempty"         |          1 |         |
	+--------------+-------------------------+--------+----------+----------+---------+---------------+-----------+-------------------------------+------------+---------+
	
SellingExpences:
	+------------------------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------------------------+------------+--------------------------------+
	|            Field             |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |                   StructTag                   | Validators |            Comment             |
	+------------------------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------------------------+------------+--------------------------------+
	| id                           | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"                           |          0 |                                |
	| offer_id                     | mixins.ID | true   | true     | true     | false   | false         | false     | json:"offer_id,omitempty"                     |          0 |                                |
	| selling_expences_template_id | mixins.ID | true   | true     | true     | false   | false         | false     | json:"selling_expences_template_id,omitempty" |          0 |                                |
	| created                      | int64     | false  | false    | false    | true    | false         | false     | json:"created,omitempty"                      |          0 |                                |
	| changed                      | int64     | false  | false    | false    | true    | false         | false     | json:"changed,omitempty"                      |          0 |                                |
	| name                         | string    | false  | false    | false    | true    | false         | false     | json:"name,omitempty"                         |          1 |                                |
	| value                        | int       | false  | false    | false    | true    | false         | false     | json:"value,omitempty"                        |          0 | Money as integer multiplied by |
	|                              |           |        |          |          |         |               |           |                                               |            |                            100 |
	+------------------------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------------------------+------------+--------------------------------+
	+---------------------------+-------------------------+---------+------------------+----------+--------+----------+---------+
	|           Edge            |          Type           | Inverse |     BackRef      | Relation | Unique | Optional | Comment |
	+---------------------------+-------------------------+---------+------------------+----------+--------+----------+---------+
	| offer                     | Offer                   | true    | selling_expenses | M2O      | true   | true     |         |
	| selling_expences_template | SellingExpencesTemplate | true    | selling_expenses | M2O      | true   | true     |         |
	+---------------------------+-------------------------+---------+------------------+----------+--------+----------+---------+
	
SellingExpencesTemplate:
	+---------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	|     Field     |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |           StructTag            | Validators | Comment |
	+---------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	| id            | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"            |          0 |         |
	| created       | int       | false  | false    | false    | true    | false         | false     | json:"created,omitempty"       |          0 |         |
	| changed       | int       | false  | false    | false    | true    | false         | false     | json:"changed,omitempty"       |          0 |         |
	| name          | string    | false  | false    | false    | true    | false         | false     | json:"name,omitempty"          |          1 |         |
	| default_value | int       | false  | false    | false    | true    | false         | false     | json:"default_value,omitempty" |          0 |         |
	| archived      | int       | false  | false    | false    | true    | false         | false     | json:"archived,omitempty"      |          0 |         |
	| descriptor    | string    | false  | false    | false    | true    | false         | false     | json:"descriptor,omitempty"    |          1 |         |
	+---------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	+------------------+-----------------+---------+---------+----------+--------+----------+---------+
	|       Edge       |      Type       | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+------------------+-----------------+---------+---------+----------+--------+----------+---------+
	| selling_expenses | SellingExpences | false   |         | O2M      | false  | true     |         |
	+------------------+-----------------+---------+---------+----------+--------+----------+---------+
	
Setting:
	+---------+-------------------------+--------+----------+----------+---------+---------------+-----------+---------------------+------------+---------+
	|  Field  |          Type           | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |      StructTag      | Validators | Comment |
	+---------+-------------------------+--------+----------+----------+---------+---------------+-----------+---------------------+------------+---------+
	| id      | mixins.ID               | true   | false    | false    | false   | false         | true      | json:"id,omitempty" |          0 |         |
	| scope   | string                  | false  | false    | false    | false   | false         | true      | json:"scope"        |          1 |         |
	| key     | string                  | false  | false    | false    | false   | false         | true      | json:"key"          |          1 |         |
	| payload | map[string]interface {} | false  | false    | false    | false   | false         | false     | json:"payload"      |          0 |         |
	+---------+-------------------------+--------+----------+----------+---------+---------------+-----------+---------------------+------------+---------+
	
Snablog:
	+--------------+-----------+--------+----------+----------+---------+---------------+-----------+-------------------------------+------------+---------+
	|    Field     |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |           StructTag           | Validators | Comment |
	+--------------+-----------+--------+----------+----------+---------+---------------+-----------+-------------------------------+------------+---------+
	| id           | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"           |          0 |         |
	| request_id   | mixins.ID | true   | false    | false    | false   | false         | true      | json:"request_id,omitempty"   |          0 |         |
	| employee_id  | mixins.ID | true   | false    | false    | false   | false         | false     | json:"employee_id,omitempty"  |          0 |         |
	| customer_id  | mixins.ID | true   | false    | false    | false   | false         | true      | json:"customer_id,omitempty"  |          0 |         |
	| created      | int64     | false  | false    | false    | true    | false         | false     | json:"created,omitempty"      |          0 |         |
	| changed      | int64     | false  | false    | false    | true    | false         | false     | json:"changed,omitempty"      |          0 |         |
	| event        | string    | false  | false    | false    | true    | false         | false     | json:"event,omitempty"        |          1 |         |
	| title        | string    | false  | false    | false    | true    | false         | false     | json:"title,omitempty"        |          1 |         |
	| activated    | int64     | false  | false    | false    | true    | false         | false     | json:"activated,omitempty"    |          0 |         |
	| context_id   | int64     | false  | false    | false    | true    | false         | false     | json:"context_id,omitempty"   |          0 |         |
	| author_id    | int64     | false  | true     | true     | false   | false         | false     | json:"author_id,omitempty"    |          0 |         |
	| scheduled_at | int64     | false  | true     | true     | false   | false         | false     | json:"scheduled_at,omitempty" |          0 |         |
	| completed_at | int64     | false  | true     | true     | false   | false         | false     | json:"completed_at,omitempty" |          0 |         |
	| note         | string    | false  | false    | false    | true    | false         | false     | json:"note,omitempty"         |          1 |         |
	+--------------+-----------+--------+----------+----------+---------+---------------+-----------+-------------------------------+------------+---------+
	+----------+----------+---------+----------+----------+--------+----------+---------+
	|   Edge   |   Type   | Inverse | BackRef  | Relation | Unique | Optional | Comment |
	+----------+----------+---------+----------+----------+--------+----------+---------+
	| request  | Request  | true    | snablogs | M2O      | true   | false    |         |
	| employee | Employee | true    | snablogs | M2O      | true   | false    |         |
	| customer | Customer | true    | snablogs | M2O      | true   | false    |         |
	+----------+----------+---------+----------+----------+--------+----------+---------+
	
Tag:
	+--------------------+-----------+--------+----------+----------+---------+---------------+-----------+-------------------------------------+------------+---------+
	|       Field        |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |              StructTag              | Validators | Comment |
	+--------------------+-----------+--------+----------+----------+---------+---------------+-----------+-------------------------------------+------------+---------+
	| id                 | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"                 |          0 |         |
	| name               | string    | true   | false    | false    | false   | false         | false     | json:"name"                         |          2 |         |
	|                    |           |        |          |          |         |               |           | validate:"required,max=32"          |            |         |
	| abbr               | string    | false  | true     | false    | true    | false         | false     | json:"abbr,omitempty"               |          1 |         |
	| icon               | string    | false  | true     | false    | true    | false         | false     | json:"icon,omitempty"               |          1 |         |
	|                    |           |        |          |          |         |               |           | validate:"max=32"                   |            |         |
	| color              | string    | false  | true     | false    | true    | false         | false     | json:"color" validate:"max=64"      |          1 |         |
	| duration_estimated | int64     | false  | true     | false    | true    | false         | false     | json:"duration_estimated,omitempty" |          0 |         |
	| priority           | int64     | false  | true     | false    | true    | false         | false     | json:"priority,omitempty"           |          0 |         |
	+--------------------+-----------+--------+----------+----------+---------+---------------+-----------+-------------------------------------+------------+---------+
	+-----------+----------+---------+---------+----------+--------+----------+---------+
	|   Edge    |   Type   | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+-----------+----------+---------+---------+----------+--------+----------+---------+
	| schedules | Schedule | false   |         | O2M      | false  | true     |         |
	+-----------+----------+---------+---------+----------+--------+----------+---------+
	
Term:
	+---------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------+------------+---------+
	|  Field  |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |        StructTag         | Validators | Comment |
	+---------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------+------------+---------+
	| id      | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"      |          0 |         |
	| dict_id | int64     | false  | false    | false    | false   | false         | false     | json:"dict_id,omitempty" |          0 |         |
	| name    | string    | false  | false    | false    | false   | false         | false     | json:"name,omitempty"    |          2 |         |
	| weight  | int64     | false  | true     | false    | true    | false         | false     | json:"weight,omitempty"  |          0 |         |
	+---------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------+------------+---------+
	+--------------+------------+---------+---------+----------+--------+----------+---------+
	|     Edge     |    Type    | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+--------------+------------+---------+---------+----------+--------+----------+---------+
	| categories   | Product    | false   |         | O2M      | false  | true     |         |
	| brands       | Product    | false   |         | O2M      | false  | true     |         |
	| comment_tags | CommentTag | false   |         | O2M      | false  | true     |         |
	+--------------+------------+---------+---------+----------+--------+----------+---------+
	
Upd:
	+----------+-----------+--------+----------+----------+---------+---------------+-----------+---------------------------+------------+---------+
	|  Field   |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |         StructTag         | Validators | Comment |
	+----------+-----------+--------+----------+----------+---------+---------------+-----------+---------------------------+------------+---------+
	| id       | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"       |          0 |         |
	| created  | int64     | false  | false    | false    | true    | false         | false     | json:"created,omitempty"  |          0 |         |
	| changed  | int64     | false  | false    | false    | true    | false         | false     | json:"changed,omitempty"  |          0 |         |
	| number   | int64     | false  | false    | false    | true    | false         | false     | json:"number,omitempty"   |          0 |         |
	| date     | int64     | false  | false    | false    | true    | false         | false     | json:"date,omitempty"     |          0 |         |
	| rids     | string    | false  | false    | false    | true    | false         | false     | json:"rids,omitempty"     |          1 |         |
	| exported | int64     | false  | false    | false    | true    | false         | false     | json:"exported,omitempty" |          0 |         |
	| invoiced | int64     | false  | false    | false    | true    | false         | false     | json:"invoiced,omitempty" |          0 |         |
	+----------+-----------+--------+----------+----------+---------+---------------+-----------+---------------------------+------------+---------+
	+--------------+------------+---------+---------+----------+--------+----------+---------+
	|     Edge     |    Type    | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+--------------+------------+---------+---------+----------+--------+----------+---------+
	| requests     | Request    | false   |         | M2M      | false  | true     |         |
	| products     | Product    | false   |         | M2M      | false  | true     |         |
	| upd_requests | UpdRequest | true    | upd     | O2M      | false  | true     |         |
	| upd_products | UpdProduct | true    | upd     | O2M      | false  | true     |         |
	+--------------+------------+---------+---------+----------+--------+----------+---------+
	
UpdProduct:
	+------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------+------------+---------+
	|   Field    |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |          StructTag          | Validators | Comment |
	+------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------+------------+---------+
	| id         | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"         |          0 |         |
	| upd_id     | mixins.ID | false  | false    | false    | false   | false         | false     | json:"upd_id,omitempty"     |          0 |         |
	| request_id | mixins.ID | false  | false    | false    | false   | false         | false     | json:"request_id,omitempty" |          0 |         |
	| product_id | mixins.ID | false  | false    | false    | false   | false         | false     | json:"product_id,omitempty" |          0 |         |
	+------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------+------------+---------+
	+---------+---------+---------+---------+----------+--------+----------+---------+
	|  Edge   |  Type   | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+---------+---------+---------+---------+----------+--------+----------+---------+
	| upd     | Upd     | false   |         | M2O      | true   | false    |         |
	| request | Request | false   |         | M2O      | true   | false    |         |
	| product | Product | false   |         | M2O      | true   | false    |         |
	+---------+---------+---------+---------+----------+--------+----------+---------+
	
UpdRequest:
	+------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------+------------+---------+
	|   Field    |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |          StructTag          | Validators | Comment |
	+------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------+------------+---------+
	| id         | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"         |          0 |         |
	| upd_id     | mixins.ID | false  | false    | false    | false   | false         | false     | json:"upd_id,omitempty"     |          0 |         |
	| request_id | mixins.ID | false  | false    | false    | false   | false         | false     | json:"request_id,omitempty" |          0 |         |
	+------------+-----------+--------+----------+----------+---------+---------------+-----------+-----------------------------+------------+---------+
	+---------+---------+---------+---------+----------+--------+----------+---------+
	|  Edge   |  Type   | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+---------+---------+---------+---------+----------+--------+----------+---------+
	| upd     | Upd     | false   |         | M2O      | true   | false    |         |
	| request | Request | false   |         | M2O      | true   | false    |         |
	+---------+---------+---------+---------+----------+--------+----------+---------+
	
User:
	+-----------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	|   Field   |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |           StructTag            | Validators | Comment |
	+-----------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	| id        | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"            |          0 |         |
	| Email     | string    | false  | false    | false    | false   | false         | false     | json:"email"                   |          0 |         |
	|           |           |        |          |          |         |               |           | validate:"required,email"      |            |         |
	| Status    | int       | false  | false    | false    | true    | false         | false     | json:"status"                  |          0 |         |
	| Login     | string    | false  | false    | false    | true    | false         | false     | json:"login"                   |          1 |         |
	|           |           |        |          |          |         |               |           | validate:"required,lte=64"     |            |         |
	| Timezone  | string    | false  | true     | false    | false   | false         | false     | json:"timezone"                |          0 |         |
	|           |           |        |          |          |         |               |           | validate:"required,lte=64"     |            |         |
	| Language  | string    | false  | false    | false    | true    | false         | false     | json:"language"                |          0 |         |
	|           |           |        |          |          |         |               |           | validate:"required,lte=64"     |            |         |
	| Created   | int64     | false  | true     | false    | false   | false         | false     | json:"created"                 |          0 |         |
	| Changed   | int64     | false  | true     | false    | false   | false         | false     | json:"changed"                 |          0 |         |
	| Accessed  | int64     | false  | true     | false    | false   | false         | false     | json:"accessed"                |          0 |         |
	| LastLogin | int64     | false  | true     | false    | false   | false         | false     | json:"lastLogin"               |          0 |         |
	+-----------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	+-------------+-------------+---------+---------+----------+--------+----------+---------+
	|    Edge     |    Type     | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+-------------+-------------+---------+---------+----------+--------+----------+---------+
	| userRoles   | UserRole    | false   |         | M2M      | false  | true     |         |
	| sessions    | UserSession | false   |         | O2M      | false  | true     |         |
	| customer    | Customer    | false   |         | O2O      | true   | true     |         |
	| userRoleRef | UserRoleRef | true    | user    | O2M      | false  | true     |         |
	+-------------+-------------+---------+---------+----------+--------+----------+---------+
	
UserRole:
	+-------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	| Field |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |           StructTag            | Validators | Comment |
	+-------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	| id    | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"            |          0 |         |
	| Name  | string    | false  | false    | false    | false   | false         | false     | json:"name"                    |          0 |         |
	|       |           |        |          |          |         |               |           | validate:"required,max=64"     |            |         |
	+-------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------------+------------+---------+
	+-------------+-------------+---------+-----------+----------+--------+----------+---------+
	|    Edge     |    Type     | Inverse |  BackRef  | Relation | Unique | Optional | Comment |
	+-------------+-------------+---------+-----------+----------+--------+----------+---------+
	| users       | User        | true    | userRoles | M2M      | false  | true     |         |
	| userRoleRef | UserRoleRef | true    | role      | O2M      | false  | true     |         |
	+-------------+-------------+---------+-----------+----------+--------+----------+---------+
	
UserRoleRef:
	+-------+-----------+--------+----------+----------+---------+---------------+-----------+----------------------+------------+---------+
	| Field |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |      StructTag       | Validators | Comment |
	+-------+-----------+--------+----------+----------+---------+---------------+-----------+----------------------+------------+---------+
	| uid   | mixins.ID | false  | false    | false    | false   | false         | true      | json:"uid,omitempty" |          0 |         |
	| rid   | mixins.ID | false  | false    | false    | false   | false         | true      | json:"rid,omitempty" |          0 |         |
	+-------+-----------+--------+----------+----------+---------+---------------+-----------+----------------------+------------+---------+
	+------+----------+---------+---------+----------+--------+----------+---------+
	| Edge |   Type   | Inverse | BackRef | Relation | Unique | Optional | Comment |
	+------+----------+---------+---------+----------+--------+----------+---------+
	| user | User     | false   |         | M2O      | true   | false    |         |
	| role | UserRole | false   |         | M2O      | true   | false    |         |
	+------+----------+---------+---------+----------+--------+----------+---------+
	
UserSession:
	+-----------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------+------------+---------+
	|      Field      |   Type    | Unique | Optional | Nillable | Default | UpdateDefault | Immutable |        StructTag         | Validators | Comment |
	+-----------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------+------------+---------+
	| id              | mixins.ID | true   | false    | false    | false   | false         | true      | json:"id,omitempty"      |          0 |         |
	| user_id         | mixins.ID | true   | false    | false    | false   | false         | false     | json:"user_id,omitempty" |          0 |         |
	| session_id      | string    | false  | false    | false    | false   | false         | false     | json:"sessionID"         |          0 |         |
	| SecureSessionID | string    | false  | false    | false    | false   | false         | false     | json:"secureSessionID"   |          0 |         |
	| Hostname        | string    | false  | false    | false    | false   | false         | false     | json:"hostname"          |          0 |         |
	| Issued          | int64     | false  | false    | false    | false   | false         | false     | json:"issued"            |          0 |         |
	+-----------------+-----------+--------+----------+----------+---------+---------------+-----------+--------------------------+------------+---------+
	+------+------+---------+----------+----------+--------+----------+---------+
	| Edge | Type | Inverse | BackRef  | Relation | Unique | Optional | Comment |
	+------+------+---------+----------+----------+--------+----------+---------+
	| user | User | true    | sessions | M2O      | true   | false    |         |
	+------+------+---------+----------+----------+--------+----------+---------+
	
