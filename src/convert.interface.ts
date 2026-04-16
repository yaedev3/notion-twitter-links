export interface Notion {
  object: string
  id: string
  created_time: Date
  last_edited_time: Date
  created_by: TedBy
  last_edited_by: TedBy
  cover: null
  icon: null
  parent: Parent
  in_trash: boolean
  is_archived: boolean
  is_locked: boolean
  properties: Properties
  url: string
  public_url: null
  archived: boolean
}

export interface TedBy {
  object: string
  id: string
}

export interface Parent {
  type: string
  data_source_id: string
  database_id: string
}

export interface Properties {
  Link: Link
  'Created time': CreatedTime
  Tag: Tag
  'Last edited time': LastEditedTime
  Downloaded: Downloaded
  Name: Name
}

export interface CreatedTime {
  id: string
  type: string
  created_time: Date
}

export interface Downloaded {
  id: string
  type: string
  checkbox: boolean
}

export interface LastEditedTime {
  id: string
  type: string
  last_edited_time: Date
}

export interface Link {
  id: string
  type: string
  url: string
}

export interface Name {
  id: string
  type: string
  title: Title[]
}

export interface Title {
  type: string
  text: Text
  annotations: Annotations
  plain_text: string
  href: null
}

export interface Annotations {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string
}

export interface Text {
  content: string
  link: null
}

export interface Tag {
  id: string
  type: string
  select: Select
}

export interface Select {
  id: string
  name: string
  color: string
}

export interface NotionConvertedRow {
  link: string
  downloaded: boolean
  tag: string
}
