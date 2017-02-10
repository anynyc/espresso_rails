json.favorites do
  json.array! @favorites, partial: 'api/v1/favorites/favorite', as: :favorite
end
