USE [master]
GO

IF db_id('SpeakApp') IS NULL
	CREATE DATABASE SpeakApp
GO

USE [SpeakApp]
GO


CREATE TABLE [User] (
  [Id] integer IDENTITY(1, 1) PRIMARY KEY NOT NULL,
  [FireBaseUserId] nvarchar(255) UNIQUE NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) UNIQUE NOT NULL,
  [DisplayName] nvarchar(255) NOT NULL,
  [Image] nvarchar(255) NULL,
  [Status] bit NOT NULL DEFAULT (0),
)
GO

CREATE TABLE [Message] (
  [Id] integer IDENTITY(1, 1) PRIMARY KEY NOT NULL,
  [Body] text NOT NULL,
  [ChatId] integer NOT NULL,
  [UserId] integer NOT NULL,
  [DateCreated] datetime NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [UserImage] nvarchar(255) NULL,
  [Edit] bit NOT NULL DEFAULT (0),
  [Pinned] bit NOT NULL DEFAULT (0)
)
GO

CREATE TABLE [Chat] (
  [Id] integer IDENTITY(1, 1) PRIMARY KEY NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Type] nvarchar(255) NOT NULL,
  [Sender] nvarchar(255) NULL,
  [Receiver] nvarchar(255) NULL
)
GO

CREATE TABLE [UserChat] (
  [Id] integer IDENTITY(1, 1) PRIMARY KEY NOT NULL,
  [UserId] integer NOT NULL,
  [ChatId] integer NOT NULL
)
GO

ALTER TABLE [UserChat] ADD FOREIGN KEY ([ChatId]) REFERENCES [Chat] ([Id])
GO

ALTER TABLE [Message] ADD FOREIGN KEY ([ChatId]) REFERENCES [Chat] ([Id])
GO

ALTER TABLE [UserChat] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Message] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO