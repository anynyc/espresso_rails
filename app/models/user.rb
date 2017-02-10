class User < ApplicationRecord
  has_secure_password

  validates :email, uniqueness: true, on: :create
  validates :email, presence: true

  #associations
  has_many :favorites
  has_many :videos, through: :favorites, class_name: "Video", foreign_key: :video_id, primary_key: :id
end
