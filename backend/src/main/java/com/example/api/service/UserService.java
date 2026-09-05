package com.example.api.service;

import com.example.api.dto.user.UserRequestDTO;
import com.example.api.dto.user.UserResponseDTO;
import com.example.api.entity.User;
import com.example.api.exception.ResourceNotFoundException;
import com.example.api.mapper.UserMapper;
import com.example.api.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public Optional<UserResponseDTO> findById(Long id) {
        return userRepository.findById(id)
                .map(userMapper::toResponseDTO);
    }

    public UserResponseDTO createUser(UserRequestDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("Korisnik sa email-om " + userDTO.getEmail() + " već postoji");
        }

        User user = userMapper.toEntity(userDTO);
        User savedUser = userRepository.save(user);
        return userMapper.toResponseDTO(savedUser);
    }

    public UserResponseDTO updateUser(Long id, UserRequestDTO userDTO) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Korisnik sa ID " + id + " nije pronađen"));

        if (userDTO.getEmail() != null
                && !userDTO.getEmail().equals(existingUser.getEmail())
                && userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("Korisnik sa email-om " + userDTO.getEmail() + " već postoji");
        }

        userMapper.updateEntityFromDTO(userDTO, existingUser);
        User updatedUser = userRepository.save(existingUser);

        return userMapper.toResponseDTO(updatedUser);
    }

    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
