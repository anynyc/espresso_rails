class Admin < ApplicationRecord

  has_secure_password

  validates :email, uniqueness: true, on: :create
  validates :email, presence: true
end
