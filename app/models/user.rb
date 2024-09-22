class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  ROLES = %i[doctor receptionist]

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
